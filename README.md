# Autonomous Robot Simulator

A browser-based robotics learning project built with React, TypeScript, and Three.js. It combines grid/sampling path planners, differential-drive kinematics, and an extended Kalman filter with a 3D simulation view and telemetry controls.

## Run locally

Use Node.js 22.12+ and npm. The application lives in a nested directory:

```bash
git clone https://github.com/Sourya-Prabaharan/Autonomous-robot-simulator.git
cd Autonomous-robot-simulator/autonomous-robot-simulator
npm ci
npm run dev
```

Open the Vite URL printed in the terminal (normally http://localhost:5173). This is a browser simulation; it does not control a physical robot or connect to ROS.

```bash
npm run build
npm run lint
npm run preview
```

## Implementation

- [Simulation loop](autonomous-robot-simulator/src/components/Visualizer/SimulationLoop.tsx) integrates the planner, motion model, and visualization.
- [Planner implementations](autonomous-robot-simulator/src/logic/PathPlanner) include A*, RRT*, and a reverse-search planner labeled D* Lite in the UI. The latter rebuilds its search per call; it is not a full incremental D* Lite implementation.
- [Kinematics](autonomous-robot-simulator/src/logic/KinematicsEngine.ts) updates planar position and heading.
- [EKF estimator](autonomous-robot-simulator/src/logic/EKFEstimator.ts) demonstrates state prediction and measurement updates.

The project contribution is the integration of these algorithms with interactive visualization. Planner optimality, estimator accuracy, and physical-robot safety have not been independently evaluated. Build and lint checks verify the application, not those scientific properties. No hosted deployment is claimed here.
