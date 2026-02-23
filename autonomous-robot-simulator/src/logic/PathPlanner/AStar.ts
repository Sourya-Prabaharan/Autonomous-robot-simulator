import type { Point, MapManager } from '../MapManager';
import type { PathPlanner } from './PathPlanner';

interface Node extends Point {
    g: number;
    h: number;
    f: number;
    parent?: Node;
}

export class AStarPlanner implements PathPlanner {
    getName() { return "A*"; }

    plan(start: Point, goal: Point, map: MapManager): Point[] {
        const openSet: Node[] = [];
        const closedSet: Set<string> = new Set();

        const startNode: Node = { ...start, g: 0, h: this.heuristic(start, goal), f: 0 };
        startNode.f = startNode.h;
        openSet.push(startNode);

        while (openSet.length > 0) {
            openSet.sort((a, b) => a.f - b.f);
            const current = openSet.shift()!;

            if (this.isReached(current, goal, 1 / map.resolution)) {
                return this.reconstructPath(current);
            }

            const key = `${Math.floor(current.x * map.resolution)},${Math.floor(current.y * map.resolution)}`;
            if (closedSet.has(key)) continue;
            closedSet.add(key);

            const neighbors = this.getNeighbors(current, map);
            for (const neighbor of neighbors) {
                const neighborKey = `${Math.floor(neighbor.x * map.resolution)},${Math.floor(neighbor.y * map.resolution)}`;
                if (closedSet.has(neighborKey)) continue;

                const tentativeG = current.g + this.distance(current, neighbor);

                const existingInOpen = openSet.find(n => `${Math.floor(n.x * map.resolution)},${Math.floor(n.y * map.resolution)}` === neighborKey);

                if (!existingInOpen || tentativeG < existingInOpen.g) {
                    const newNode: Node = {
                        ...neighbor,
                        g: tentativeG,
                        h: this.heuristic(neighbor, goal),
                        f: tentativeG + this.heuristic(neighbor, goal),
                        parent: current
                    };

                    if (!existingInOpen) {
                        openSet.push(newNode);
                    } else {
                        existingInOpen.g = newNode.g;
                        existingInOpen.f = newNode.f;
                        existingInOpen.parent = newNode.parent;
                    }
                }
            }
        }

        return [];
    }

    private heuristic(a: Point, b: Point): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    private distance(a: Point, b: Point): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    private isReached(current: Point, goal: Point, threshold: number): boolean {
        return this.distance(current, goal) < threshold;
    }

    private getNeighbors(node: Point, map: MapManager): Point[] {
        const res = 1 / map.resolution;
        const neighbors: Point[] = [];
        const dirs = [
            { x: res, y: 0 }, { x: -res, y: 0 }, { x: 0, y: res }, { x: 0, y: -res },
            { x: res, y: res }, { x: -res, y: res }, { x: res, y: -res }, { x: -res, y: -res }
        ];

        for (const d of dirs) {
            const nx = node.x + d.x;
            const ny = node.y + d.y;
            if (!map.isObstacle(nx, ny)) {
                neighbors.push({ x: nx, y: ny });
            }
        }
        return neighbors;
    }

    private reconstructPath(node: Node): Point[] {
        const path: Point[] = [];
        let current: Node | undefined = node;
        while (current) {
            path.push({ x: current.x, y: current.y });
            current = current.parent;
        }
        return path.reverse();
    }
}
