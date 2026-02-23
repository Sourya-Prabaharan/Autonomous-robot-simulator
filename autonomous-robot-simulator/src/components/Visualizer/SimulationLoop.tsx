import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { KinematicsEngine } from '../../logic/KinematicsEngine';
import type { State, ControlInput } from '../../logic/KinematicsEngine';
import type { EKFEstimator } from '../../logic/EKFEstimator';
import type { Point } from '../../logic/MapManager';

interface SimulationLoopProps {
    isSimulating: boolean;
    path: Point[];
    robotState: State;
    setRobotState: (s: State) => void;
    noiseLevel: number;
    onArrived: () => void;
    ekf: EKFEstimator;
    setEstimatedState: (s: State) => void;
}

export const SimulationLoop = ({
    isSimulating, path, robotState, setRobotState,
    noiseLevel, onArrived, ekf, setEstimatedState
}: SimulationLoopProps) => {
    const pathIndexRef = useRef(0);
    const kinematicsRef = useRef<KinematicsEngine | null>(null);

    // Reset path index when path changes
    useEffect(() => {
        pathIndexRef.current = 0;
    }, [path]);

    // Sync kinematics state if robot is moved manually (outside simulation)
    useEffect(() => {
        if (!isSimulating) {
            kinematicsRef.current = new KinematicsEngine(robotState);
        }
    }, [isSimulating, robotState]);

    useFrame((_state, delta) => {
        if (!isSimulating || path.length === 0 || !kinematicsRef.current) return;

        // dt capping for stability
        const dt = Math.min(delta, 0.1);

        // Target tracking
        const target = path[pathIndexRef.current];
        if (!target) return;

        const dx = target.x - robotState.x;
        const dy = target.y - robotState.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.3) {
            if (pathIndexRef.current < path.length - 1) {
                pathIndexRef.current++;
            } else {
                onArrived();
                return;
            }
        }

        // P-Control for linear and angular velocity
        const angleToTarget = Math.atan2(dy, dx);
        let angleDiff = angleToTarget - robotState.theta;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        const v = Math.min(dist * 2, 1.5); // Slightly slower for better visibility
        const w = angleDiff * 6;

        const u: ControlInput = { v, w };

        // 1. Move "Ground Truth" robot
        const nextState = kinematicsRef.current.step(u, dt);

        // 2. Predict EKF
        ekf.predict(u, dt);

        // 3. Inject noise into "Measurement"
        const noisyX = nextState.x + (Math.random() - 0.5) * noiseLevel * 2;
        const noisyY = nextState.y + (Math.random() - 0.5) * noiseLevel * 2;
        const noisyTheta = nextState.theta + (Math.random() - 0.5) * noiseLevel * 0.5;

        // 4. Update EKF with noisy measurement
        ekf.update([noisyX, noisyY, noisyTheta]);

        setRobotState(nextState);
        setEstimatedState(ekf.getState());
    });

    return null;
};
