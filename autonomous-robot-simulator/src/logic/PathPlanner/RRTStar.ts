import type { Point, MapManager } from '../MapManager';
import type { PathPlanner } from './PathPlanner';

interface RRTNode extends Point {
    parent?: RRTNode;
    cost: number;
}

export class RRTStarPlanner implements PathPlanner {
    maxIterations: number = 2000;
    stepSize: number = 0.5;
    searchRadius: number = 1.0;

    getName() { return "RRT*"; }

    plan(start: Point, goal: Point, map: MapManager): Point[] {
        const tree: RRTNode[] = [{ ...start, cost: 0 }];
        const goalThreshold = 0.5;

        for (let i = 0; i < this.maxIterations; i++) {
            const rnd: Point = this.sample(map, goal);
            const nearest = this.getNearest(tree, rnd);
            const newNode = this.steer(nearest, rnd);

            if (newNode && !this.isCollision(nearest, newNode, map)) {
                const neighbors = this.getNeighbors(tree, newNode);
                let minNodes = nearest;
                let minCost = nearest.cost + this.distance(nearest, newNode);

                for (const neighbor of neighbors) {
                    const cost = neighbor.cost + this.distance(neighbor, newNode);
                    if (!this.isCollision(neighbor, newNode, map) && cost < minCost) {
                        minNodes = neighbor;
                        minCost = cost;
                    }
                }

                const addedNode: RRTNode = { ...newNode, parent: minNodes, cost: minCost };
                tree.push(addedNode);

                for (const neighbor of neighbors) {
                    const cost = addedNode.cost + this.distance(addedNode, neighbor);
                    if (!this.isCollision(addedNode, neighbor, map) && cost < neighbor.cost) {
                        neighbor.parent = addedNode;
                        neighbor.cost = cost;
                    }
                }

                if (this.distance(addedNode, goal) < goalThreshold) {
                    return this.reconstructPath(addedNode, goal);
                }
            }
        }

        return [];
    }

    private sample(map: MapManager, goal: Point): Point {
        if (Math.random() < 0.1) return goal;
        return {
            x: Math.random() * map.width,
            y: Math.random() * map.height
        };
    }

    private getNearest(tree: RRTNode[], p: Point): RRTNode {
        let nearest = tree[0];
        let minDist = this.distance(nearest, p);
        for (const node of tree) {
            const d = this.distance(node, p);
            if (d < minDist) {
                minDist = d;
                nearest = node;
            }
        }
        return nearest;
    }

    private steer(from: Point, to: Point): Point | null {
        const d = this.distance(from, to);
        if (d < 1e-6) return null;
        const step = Math.min(d, this.stepSize);
        const theta = Math.atan2(to.y - from.y, to.x - from.x);
        return {
            x: from.x + step * Math.cos(theta),
            y: from.y + step * Math.sin(theta)
        };
    }

    private isCollision(p1: Point, p2: Point, map: MapManager): boolean {
        const d = this.distance(p1, p2);
        const steps = Math.ceil(d * map.resolution * 2);
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = p1.x + (p2.x - p1.x) * t;
            const y = p1.y + (p2.y - p1.y) * t;
            if (map.isObstacle(x, y)) return true;
        }
        return false;
    }

    private getNeighbors(tree: RRTNode[], p: Point): RRTNode[] {
        return tree.filter(n => this.distance(n, p) < this.searchRadius);
    }

    private distance(a: Point, b: Point): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    private reconstructPath(node: RRTNode, goal: Point): Point[] {
        const path: Point[] = [goal];
        let curr: RRTNode | undefined = node;
        while (curr) {
            path.push({ x: curr.x, y: curr.y });
            curr = curr.parent;
        }
        return path.reverse();
    }
}
