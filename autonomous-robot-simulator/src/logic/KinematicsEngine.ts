export interface State {
    x: number;
    y: number;
    theta: number; // orientation in radians
}

export interface ControlInput {
    v: number; // linear velocity
    w: number; // angular velocity
}

export class KinematicsEngine {
    state: State;

    constructor(initialState: State = { x: 0, y: 0, theta: 0 }) {
        this.state = initialState;
    }

    // Pure differential drive kinematics (Unicycle model)
    step(u: ControlInput, dt: number): State {
        const { v, w } = u;
        const { x, y, theta } = this.state;

        let nextX, nextY, nextTheta;

        if (Math.abs(w) < 1e-6) {
            // Straight line motion
            nextX = x + v * Math.cos(theta) * dt;
            nextY = y + v * Math.sin(theta) * dt;
            nextTheta = theta;
        } else {
            // General case: circular arc
            nextX = x + (v / w) * (Math.sin(theta + w * dt) - Math.sin(theta));
            nextY = y - (v / w) * (Math.cos(theta + w * dt) - Math.cos(theta));
            nextTheta = theta + w * dt;
        }

        this.state = {
            x: nextX,
            y: nextY,
            theta: this.normalizeTheta(nextTheta)
        };

        return this.state;
    }

    private normalizeTheta(theta: number): number {
        while (theta > Math.PI) theta -= 2 * Math.PI;
        while (theta < -Math.PI) theta += 2 * Math.PI;
        return theta;
    }

    setState(state: State) {
        this.state = state;
    }
}
