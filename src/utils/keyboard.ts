/**
 * Keyboard event handling utilities.
 * Maps keyboard events to game directions.
 */

import { Direction } from '../core/game-logic/types';

/**
 * Maps keyboard keys to game directions.
 */
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

/**
 * Checks if a key event corresponds to a valid game direction.
 * @param event - Keyboard event
 * @returns True if the key is a valid direction key
 */
export const isDirectionKey = (event: KeyboardEvent): boolean => {
  return event.key in KEY_TO_DIRECTION;
};

/**
 * Gets the direction from a keyboard event.
 * @param event - Keyboard event
 * @returns Direction or undefined if not a direction key
 */
export const getDirectionFromKey = (event: KeyboardEvent): Direction | undefined => {
  return KEY_TO_DIRECTION[event.key];
};

/**
 * Creates a keyboard event handler for game controls.
 * @param onMove - Callback when a direction key is pressed
 * @returns Event handler function
 */
export const createKeyboardHandler = (
  onMove: (direction: Direction) => void
): ((event: KeyboardEvent) => void) => {
  return (event: KeyboardEvent) => {
    const direction = getDirectionFromKey(event);
    
    if (direction) {
      event.preventDefault(); // Prevent page scrolling
      onMove(direction);
    }
  };
};
