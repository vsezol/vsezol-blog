export interface Position {
  y: number;
  x: number;
}

export type SensivityNames = 'step' | 'position' | 'direction';
export type Sensivity = Record<SensivityNames, number>;

export type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
