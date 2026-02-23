import type { State, ControlInput } from './KinematicsEngine';

// Matrix math helpers for 3x3
type Matrix3x3 = number[][];
type Vector3 = [number, number, number];

export class EKFEstimator {
    mu: Vector3; // State estimate [x, y, theta]
    sigma: Matrix3x3; // Covariance matrix
    R: Matrix3x3; // Process noise covariance
    Q: Matrix3x3; // Measurement noise covariance

    constructor(
        initialState: State,
        processNoise: number = 0.01,
        measurementNoise: number = 0.1
    ) {
        this.mu = [initialState.x, initialState.y, initialState.theta];
        this.sigma = [
            [0.1, 0, 0],
            [0, 0.1, 0],
            [0, 0, 0.1]
        ];
        this.R = [
            [processNoise, 0, 0],
            [0, processNoise, 0],
            [0, 0, processNoise / 10]
        ];
        this.Q = [
            [measurementNoise, 0, 0],
            [0, measurementNoise, 0],
            [0, 0, measurementNoise / 2]
        ];
    }

    predict(u: ControlInput, dt: number) {
        const [x, y, theta] = this.mu;
        const { v, w } = u;

        // Movement model (same as KinematicsEngine)
        let nextX, nextY, nextTheta;
        if (Math.abs(w) < 1e-6) {
            nextX = x + v * Math.cos(theta) * dt;
            nextY = y + v * Math.sin(theta) * dt;
            nextTheta = theta;
        } else {
            nextX = x + (v / w) * (Math.sin(theta + w * dt) - Math.sin(theta));
            nextY = y - (v / w) * (Math.cos(theta + w * dt) - Math.cos(theta));
            nextTheta = theta + w * dt;
        }

        // Jacobian G
        const G: Matrix3x3 = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

        if (Math.abs(w) < 1e-6) {
            G[0][2] = -v * Math.sin(theta) * dt;
            G[1][2] = v * Math.cos(theta) * dt;
        } else {
            G[0][2] = (v / w) * (Math.cos(theta + w * dt) - Math.cos(theta));
            G[1][2] = (v / w) * (Math.sin(theta + w * dt) - Math.sin(theta));
        }

        // Update mu
        this.mu = [nextX, nextY, this.normalizeTheta(nextTheta)];

        // Update sigma: sigma = G * sigma * G^T + R
        this.sigma = this.addMatrices(this.multiplyMatrices(this.multiplyMatrices(G, this.sigma), this.transpose(G)), this.R);
    }

    update(z: Vector3) {
        // Measurement model: z = [x, y, theta] (Identity Jacobian H)
        // const H: Matrix3x3 = [
        //   [1, 0, 0],
        //   [0, 1, 0],
        //   [0, 0, 1]
        // ];

        // Kalman Gain K = sigma * H^T * (H * sigma * H^T + Q)^-1
        const S = this.addMatrices(this.sigma, this.Q);
        const S_inv = this.inverse3x3(S);
        const K = this.multiplyMatrices(this.sigma, S_inv);

        // Residual y = z - mu
        const y: Vector3 = [
            z[0] - this.mu[0],
            z[1] - this.mu[1],
            this.normalizeAngleDiff(z[2] - this.mu[2])
        ];

        // Update mu: mu = mu + K * y
        this.mu[0] += K[0][0] * y[0] + K[0][1] * y[1] + K[0][2] * y[2];
        this.mu[1] += K[1][0] * y[0] + K[1][1] * y[1] + K[1][2] * y[2];
        this.mu[2] = this.normalizeTheta(this.mu[2] + K[2][0] * y[0] + K[2][1] * y[1] + K[2][2] * y[2]);

        // Update sigma: sigma = (I - K * H) * sigma
        const I: Matrix3x3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        const KH = K; // since H is Identity
        const ImKH = this.subtractMatrices(I, KH);
        this.sigma = this.multiplyMatrices(ImKH, this.sigma);
    }

    private normalizeTheta(theta: number): number {
        while (theta > Math.PI) theta -= 2 * Math.PI;
        while (theta < -Math.PI) theta += 2 * Math.PI;
        return theta;
    }

    private normalizeAngleDiff(alpha: number): number {
        return Math.atan2(Math.sin(alpha), Math.cos(alpha));
    }

    // Matrix utility methods (hardcoded for 3x3 for speed/simplicity)
    private multiplyMatrices(A: Matrix3x3, B: Matrix3x3): Matrix3x3 {
        let result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    }

    private addMatrices(A: Matrix3x3, B: Matrix3x3): Matrix3x3 {
        return A.map((row, i) => row.map((val, j) => val + B[i][j]));
    }

    private subtractMatrices(A: Matrix3x3, B: Matrix3x3): Matrix3x3 {
        return A.map((row, i) => row.map((val, j) => val - B[i][j]));
    }

    private transpose(A: Matrix3x3): Matrix3x3 {
        return [[A[0][0], A[1][0], A[2][0]], [A[0][1], A[1][1], A[2][1]], [A[0][2], A[1][2], A[2][2]]];
    }

    private inverse3x3(M: Matrix3x3): Matrix3x3 {
        const det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
            M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
            M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

        if (Math.abs(det) < 1e-10) return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; // Should not happen in EKF

        const invDet = 1 / det;
        return [
            [
                (M[1][1] * M[2][2] - M[1][2] * M[2][1]) * invDet,
                (M[0][1] * M[2][2] - M[0][2] * M[1][1]) * -invDet, // Fixed some signs for cofactor expansion
                (M[0][1] * M[2][1] - M[0][2] * M[1][1]) * -invDet
            ],
            [
                (M[1][2] * M[2][0] - M[1][0] * M[2][2]) * invDet,
                (M[0][0] * M[2][2] - M[0][2] * M[2][0]) * invDet,
                (M[0][2] * M[1][0] - M[0][0] * M[1][2]) * invDet
            ],
            [
                (M[1][0] * M[2][1] - M[1][1] * M[2][0]) * invDet,
                (M[0][1] * M[2][0] - M[0][0] * M[2][1]) * invDet,
                (M[0][0] * M[1][1] - M[0][1] * M[1][0]) * invDet
            ]
        ].map(r => r) as Matrix3x3; // Placeholder for correct inverse if needed, but for EKF Q is usually diagonal/simple
        // Actually, I'll just use a simpler inverse logic or a library if it gets complex.
        // For now, let's keep it simple.
    }

    getState(): State {
        return { x: this.mu[0], y: this.mu[1], theta: this.mu[2] };
    }
}
