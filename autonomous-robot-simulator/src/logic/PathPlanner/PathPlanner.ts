import type { Point, MapManager } from '../MapManager';

export interface PathPlanner {
    plan(start: Point, goal: Point, map: MapManager): Point[];
    getName(): string;
}
