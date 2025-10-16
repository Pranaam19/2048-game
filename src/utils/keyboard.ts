

import { Direction } from '../core/game-logic/types';


export const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
  w: Direction.UP,
  W: Direction.UP,
  s: Direction.DOWN,
  S: Direction.DOWN,
  a: Direction.LEFT,
  A: Direction.LEFT,
  d: Direction.RIGHT,
  D: Direction.RIGHT,
};


export const isDirectionKey = (event: KeyboardEvent): boolean => {
  return event.key in KEY_TO_DIRECTION;
};


export const getDirectionFromKey = (event: KeyboardEvent): Direction | undefined => {
  return KEY_TO_DIRECTION[event.key];
};


export const createKeyboardHandler = (
  onMove: (direction: Direction) => void
): ((event: KeyboardEvent) => void) => {
  return (event: KeyboardEvent) => {
    const direction = getDirectionFromKey(event);
    
    if (direction) {
      event.preventDefault(); 
      onMove(direction);
    }
  };
};
