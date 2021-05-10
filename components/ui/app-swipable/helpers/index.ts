import { Direction, Position } from '@/types/swipes';

export const addBySensivity = <T>(item: T, last: T[], sensivity: number) => {
  return [...last, item].slice(sensivity * -1);
};

export const getPosition = (event: TouchEvent | MouseEvent) => {
  if (event instanceof MouseEvent) {
    const { clientX: x, clientY: y } = event;
    return { x, y };
  } else {
    const { clientX: x, clientY: y } = event.changedTouches[0];
    return { x, y };
  }
};

export const isPositionSkipable = (
  newPosition: Position,
  positions: Position[],
  diffSensivity: number
) => {
  let isSkip = false;

  if (positions.length > 0) {
    const calcAxisDiffAbs = (key: keyof Position) => {
      return Math.abs(positions.slice(-1)[0][key] - newPosition[key]);
    };

    if (
      calcAxisDiffAbs('x') < diffSensivity &&
      calcAxisDiffAbs('y') < diffSensivity
    ) {
      isSkip = true;
    }
  }

  return isSkip;
};

export const getMostPopularDirection = (directions: Direction[]): Direction => {
  const uniqDirections = [...new Set(directions)];

  const directionsPopularity = [...uniqDirections].flatMap(
    uniqD => directions.filter(d => d === uniqD).length
  );

  const maxPopularity = directionsPopularity.reduce((p, c) => (c > p ? c : p));

  const mostPopularDirectionIndex = directionsPopularity.findIndex(
    dP => dP === maxPopularity
  );

  return uniqDirections[mostPopularDirectionIndex];
};

export const getDirectionFromPositions = (positions: Position[]): Direction => {
  const keys: (keyof Position)[] = ['x', 'y'];

  const axisDiffs = keys.map(key => calcAxisDiffByKey(key, positions)) as [
    number,
    number
  ];

  return checkDirection.apply(null, axisDiffs);
};

export const getSwipeAxis = (swipeDirection: Direction) => {
  if (['up', 'down'].includes(swipeDirection)) return 'y';
  else if (['left', 'right'].includes(swipeDirection)) return 'x';
};

const calcAxisDiffByKey = (key: keyof Position, positions: Position[]) => {
  return positions[0][key] - positions.slice(-1)[0][key];
};

const checkDirection = (diffX: number, diffY: number): Direction => {
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      return 'left';
    } else {
      return 'right';
    }
  } else {
    if (diffY > 0) {
      return 'up';
    } else {
      return 'down';
    }
  }
};
