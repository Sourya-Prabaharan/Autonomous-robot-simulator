import React from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SimulationLoop } from './SimulationLoop';
import type { MapManager, Point } from '../../logic/MapManager';
import type { State } from '../../logic/KinematicsEngine';
import type { EKFEstimator } from '../../logic/EKFEstimator';

interface SimulatorFrameProps {
    map: MapManager;
    robotState: State;
    setRobotState: (s: State) => void;
    estimatedState: State;
    setEstimatedState: (s: State) => void;
    goal: Point;
    path: Point[];
    onSetGoal: (goal: Point) => void;
    onToggleObstacle: (x: number, y: number) => void;
    isSimulating: boolean;
    setIsSimulating: (sim: boolean) => void;
    noiseLevel: number;
    ekf: EKFEstimator;
}

const Robot = ({ state, color = "#3b82f6", opacity = 1 }: { state: State, color?: string, opacity?: number }) => {
    return (
        <group position={[state.x - 10, 0.2, state.y - 10]} rotation={[0, -state.theta, 0]}>
            {/* Robot Chassis */}
            <mesh castShadow>
                <boxGeometry args={[0.6, 0.2, 0.8]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                    transparent={opacity < 1}
                    opacity={opacity}
                />
            </mesh>
            {/* Front Indicator */}
            <mesh position={[0, 0.1, -0.3]}>
                <boxGeometry args={[0.2, 0.05, 0.1]} />
                <meshStandardMaterial
                    color="#fff"
                    emissive={color}
                    emissiveIntensity={2}
                    transparent={opacity < 1}
                    opacity={opacity}
                />
            </mesh>
        </group>
    );
};

const MapGrid = ({ map, onToggle }: { map: MapManager, onToggle: (x: number, y: number) => void }) => {
    const obstacles = [];
    const res = 1 / map.resolution;

    for (let i = 0; i < map.width * map.resolution; i++) {
        for (let j = 0; j < map.height * map.resolution; j++) {
            if (map.grid[j * Math.floor(map.width * map.resolution) + i] === 1) {
                obstacles.push(
                    <mesh
                        key={`${i}-${j}`}
                        position={[i / map.resolution - 10 + res / 2, 0.5, j / map.resolution - 10 + res / 2]}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(i / map.resolution, j / map.resolution);
                        }}
                    >
                        <boxGeometry args={[res, 1, res]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                );
            }
        }
    }

    return <group>{obstacles}</group>;
};

const PathLine = ({ path }: { path: Point[] }) => {
    if (path.length < 2) return null;

    const points = path.map(p => new THREE.Vector3(p.x - 10, 0.05, p.y - 10));
    const curve = new THREE.CatmullRomCurve3(points);

    return (
        <mesh>
            <tubeGeometry args={[curve, path.length * 2, 0.05, 8, false]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} transparent opacity={0.8} />
        </mesh>
    );
};

const Goal = ({ position }: { position: Point }) => {
    return (
        <group position={[position.x - 10, 0, position.y - 10]}>
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
                <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2} />
            </mesh>
            <pointLight color="#f43f5e" intensity={1} distance={2} />
        </group>
    );
};

const SimulatorFrame: React.FC<SimulatorFrameProps> = ({
    map, robotState, setRobotState, estimatedState, setEstimatedState,
    goal, path, onSetGoal, onToggleObstacle, isSimulating, setIsSimulating, noiseLevel, ekf
}) => {
    const handlePlaneClick = (e: ThreeEvent<MouseEvent>) => {
        const { x, z } = e.point;
        if (e.shiftKey) {
            onToggleObstacle(x + 10, z + 10);
        } else {
            onSetGoal({ x: x + 10, y: z + 10 });
        }
    };

    return (
        <Canvas shadows camera={{ position: [0, 15, 15], fov: 45 }}>
            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 20, 40]} />

            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            <SimulationLoop
                isSimulating={isSimulating}
                path={path}
                robotState={robotState}
                setRobotState={setRobotState}
                noiseLevel={noiseLevel}
                onArrived={() => setIsSimulating(false)}
                ekf={ekf}
                setEstimatedState={setEstimatedState}
            />

            <Robot state={robotState} />
            <Robot state={estimatedState} color="#10b981" opacity={0.4} />
            <MapGrid map={map} onToggle={onToggleObstacle} />
            <PathLine path={path} />
            <Goal position={goal} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} onClick={handlePlaneClick} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#111" roughness={0.5} />
            </mesh>

            <Grid
                infiniteGrid
                fadeDistance={30}
                cellColor="#333"
                sectionColor="#444"
                cellSize={1}
                sectionSize={5}
            />

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />

            <Environment preset="city" />
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={1} color="#000" />
        </Canvas>
    );
};

export default SimulatorFrame;
