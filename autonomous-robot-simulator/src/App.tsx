import React, { useState } from 'react';
import SimulatorFrame from './components/Visualizer/SimulatorFrame';
import Sidebar from './components/Dashboard/Sidebar';
import type { PathPlanner } from './logic/PathPlanner/PathPlanner';
import { MapManager } from './logic/MapManager';
import type { State } from './logic/KinematicsEngine';
import { EKFEstimator } from './logic/EKFEstimator';
import { AStarPlanner } from './logic/PathPlanner/AStar';
import { RRTStarPlanner } from './logic/PathPlanner/RRTStar';
import { DLitePlanner } from './logic/PathPlanner/DLite';

const App: React.FC = () => {
  const [map] = useState(() => new MapManager(20, 20));
  const [robotState, setRobotState] = useState<State>({ x: 2, y: 2, theta: 0 });
  const [estimatedState, setEstimatedState] = useState<State>({ x: 2, y: 2, theta: 0 });
  const [goal, setGoal] = useState({ x: 18, y: 18 });
  const [path, setPath] = useState<{ x: number, y: number }[]>(() => new AStarPlanner().plan({ x: 2, y: 2 }, { x: 18, y: 18 }, map));
  const [algorithm, setAlgorithm] = useState('A*');
  const [isSimulating, setIsSimulating] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(0.05);

  const [ekf] = useState(() => new EKFEstimator({ x: 2, y: 2, theta: 0 }));

  const planners: Record<string, PathPlanner> = {
    'A*': new AStarPlanner(),
    'RRT*': new RRTStarPlanner(),
    'D* Lite': new DLitePlanner(),
  };

  const handlePlan = () => {
    const planner = planners[algorithm];
    const newPath = planner.plan({ x: robotState.x, y: robotState.y }, goal, map);
    setPath(newPath);
  };


  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <div className="flex-1 relative">
        <SimulatorFrame
          map={map}
          robotState={robotState}
          setRobotState={setRobotState}
          estimatedState={estimatedState}
          setEstimatedState={setEstimatedState}
          goal={goal}
          path={path}
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          noiseLevel={noiseLevel}
          ekf={ekf}
          onSetGoal={(nextGoal) => {
            setGoal(nextGoal);
            setPath(planners[algorithm].plan(robotState, nextGoal, map));
          }}
          onToggleObstacle={(x, y) => {
            map.setObstacle(x, y, !map.isObstacle(x, y));
            handlePlan();
          }}
        />

        <div className="absolute top-6 left-6 p-4 glass-panel rounded-xl pointer-events-none">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            RoboSight AI
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Autonomous Motion Planning System
          </p>
        </div>
      </div>

      <Sidebar
        algorithm={algorithm}
        setAlgorithm={(nextAlgorithm) => {
          setAlgorithm(nextAlgorithm);
          setPath(planners[nextAlgorithm].plan(robotState, goal, map));
        }}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        noiseLevel={noiseLevel}
        setNoiseLevel={setNoiseLevel}
        onPlan={handlePlan}
        pathMetrics={{
          nodes: path.length,
          length: path.length > 0 ? (path.length / 10).toFixed(1) + 'm' : 'N/A'
        }}
      />
    </div>
  );
};

export default App;
