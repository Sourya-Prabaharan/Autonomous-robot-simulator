export interface Point {
  x: number;
  y: number;
}

export class MapManager {
  width: number;
  height: number;
  resolution: number; // cells per meter
  grid: Uint8Array; // 0 for free, 1 for obstacle

  constructor(width: number, height: number, resolution: number = 10) {
    this.width = width;
    this.height = height;
    this.resolution = resolution;
    this.grid = new Uint8Array(Math.floor(width * resolution) * Math.floor(height * resolution));
  }

  getGridIndex(x: number, y: number): number {
    const gx = Math.floor(x * this.resolution);
    const gy = Math.floor(y * this.resolution);
    if (gx < 0 || gx >= this.width * this.resolution || gy < 0 || gy >= this.height * this.resolution) {
      return -1;
    }
    return gy * Math.floor(this.width * this.resolution) + gx;
  }

  isObstacle(x: number, y: number): boolean {
    const idx = this.getGridIndex(x, y);
    if (idx === -1) return true; // Treat out of bounds as obstacle
    return this.grid[idx] === 1;
  }

  setObstacle(x: number, y: number, isObstacle: boolean) {
    const idx = this.getGridIndex(x, y);
    if (idx !== -1) {
      this.grid[idx] = isObstacle ? 1 : 0;
    }
  }

  addRectObstacle(x: number, y: number, w: number, h: number) {
    for (let i = x; i < x + w; i += 1 / this.resolution) {
      for (let j = y; j < y + h; j += 1 / this.resolution) {
        this.setObstacle(i, j, true);
      }
    }
  }

  clear() {
    this.grid.fill(0);
  }

  getHeatmapData() {
    // Basic representation for cost visualization
    return this.grid;
  }
}
