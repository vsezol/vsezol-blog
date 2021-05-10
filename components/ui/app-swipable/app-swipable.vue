<template>
  <div
    @touchstart="onStart"
    @touchmove="onMove"
    @touchend="onEnd"
    @mousedown="onStart"
    @mousemove="onMove"
    @mouseup="onEnd"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { Position, Direction, Sensivity } from '~/types/swipes';

import {
  addBySensivity,
  getDirectionFromPositions,
  getMostPopularDirection,
  getPosition,
  getSwipeAxis,
  isPositionSkipable
} from './helpers';

@Component
export default class AppSwipable extends Vue {
  @Prop({
    default: () => ({
      position: 2,
      direction: 2,
      step: 5
    })
  })
  sensivity: Sensivity;

  isSwipeStart = false;

  startPosition: Position;

  positions: Position[] = [];
  directions: Direction[] = [];
  swipeDirection: Direction = 'none';

  lastDiff: Position;

  @Watch('positions', { deep: true })
  onChangeLastPositions() {
    if (this.positions.length < this.sensivity.position) return;

    const direction = getDirectionFromPositions(this.positions);

    this.directions = addBySensivity(
      direction,
      this.directions,
      this.sensivity.direction
    );
  }

  @Watch('directions', { deep: true })
  onChangeLastDirections() {
    if (this.directions.length < this.sensivity.direction) return;

    this.swipeDirection = getMostPopularDirection(this.directions);

    this.lastDiff = !!this.lastDiff ? this.lastDiff : this.diffsForEmit;

    this.$emit(
      'swipe-move',
      this.swipeDirection,
      this.diffsForEmit,
      this.lastDiff
    );

    this.lastDiff = this.diffsForEmit;
  }

  get diffsForEmit() {
    const calcDiff = (key: keyof Position) => {
      const diff =
        getSwipeAxis(this.swipeDirection) === key
          ? this.positions.slice(-1)[0][key] - this.startPosition[key]
          : 0;

      return Math.round(diff);
    };

    const diffs: Position = {
      x: calcDiff('x'),
      y: calcDiff('y')
    };

    return diffs;
  }

  onStart(event: TouchEvent | MouseEvent) {
    this.isSwipeStart = true;
    this.startPosition = getPosition(event);
  }

  onMove(event: TouchEvent | MouseEvent) {
    if (!this.isSwipeStart) return;

    const pos = getPosition(event);

    if (!isPositionSkipable(pos, this.positions, this.sensivity.step)) {
      this.positions = addBySensivity(
        pos,
        this.positions,
        this.sensivity.position
      );
    }
  }

  onEnd() {
    this.$emit('swipe-end', this.swipeDirection);

    this.isSwipeStart = false;
    this.positions = [];
    this.directions = [];
    this.swipeDirection = 'none';
  }
}
</script>
