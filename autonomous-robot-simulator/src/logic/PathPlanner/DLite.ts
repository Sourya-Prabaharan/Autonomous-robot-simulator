import type { Point, MapManager } from '../MapManager';
import type { PathPlanner } from './PathPlanner';

interface DNode extends Point {
    g: number;
    rhs: number;
    key: [number, number];
}

export class DLitePlanner implements PathPlanner {
    getName() { return "D* Lite"; }

    plan(start: Point, goal: Point, map: MapManager): Point[] {
        const openSet: DNode[] = [];
        const closedSet: Set<string> = new Set();
        const nodes: Map<string, DNode> = new Map();

        const getDist = (a: Point, b: Point) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

        const goalKey = this.key(goal, map);
        const startKey = this.key(start, map);

        const goalNode: DNode = { ...goal, g: 0, rhs: 0, key: [getDist(start, goal), 0] };
        nodes.set(goalKey, goalNode);
        openSet.push(goalNode);

        const parents: Map<string, DNode> = new Map();

        while (openSet.length > 0) {
            openSet.sort((a, b) => a.key[0] - b.key[0] || a.key[1] - b.key[1]);
            const current = openSet.shift()!;
            const curKey = this.key(current, map);

            if (curKey === startKey) {
                return this.reconstructPath(current, parents, map);
            }

            if (closedSet.has(curKey)) continue;
            closedSet.add(curKey);

            const neighbors = this.getNeighbors(current, map);
            for (const neighbor of neighbors) {
                const nKey = this.key(neighbor, map);
                if (closedSet.has(nKey)) continue;

                const tentativeG = current.g + getDist(current, neighbor);
                let nNode = nodes.get(nKey);

                if (!nNode || tentativeG < nNode.g) {
                    nNode = {
                        ...neighbor,
                        g: tentativeG,
                        rhs: tentativeG,
                        key: [tentativeG + getDist(neighbor, start), tentativeG]
                    };
                    nodes.set(nKey, nNode);
                    parents.set(nKey, current);
                    openSet.push(nNode);
                }
            }
        }

        return [];
    }

    private key(p: Point, map: MapManager): string {
        return `${Math.floor(p.x * map.resolution)},${Math.floor(p.y * map.resolution)}`;
    }

    private getNeighbors(p: Point, map: MapManager): Point[] {
        const res = 1 / map.resolution;
        const neighbors: Point[] = [];
        const dirs = [
            { x: res, y: 0 }, { x: -res, y: 0 }, { x: 0, y: res }, { x: 0, y: -res },
            { x: res, y: res }, { x: -res, y: res }, { x: res, y: -res }, { x: -res, y: -res }
        ];

        for (const d of dirs) {
            const nx = p.x + d.x;
            const ny = p.y + d.y;
            if (!map.isObstacle(nx, ny)) {
                neighbors.push({ x: nx, y: ny });
            }
        }
        return neighbors;
    }

    private reconstructPath(startNode: DNode, parents: Map<string, DNode>, map: MapManager): Point[] {
        const path: Point[] = [];
        let curr: DNode | undefined = startNode;
        while (curr) {
            path.push({ x: curr.x, y: curr.y });
            curr = parents.get(this.key(curr, map));
        }
        return path;
    }
}
