/**
 * Random number generation utilities.
 * Provides seeded random for testing and pure random for gameplay.
 */

/**
 * Generates a random integer between min (inclusive) and max (exclusive).
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random integer in range [min, max)
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Selects a random element from an array.
 * @param array - Array to select from
 * @returns Random element or undefined if array is empty
 */
export const randomElement = <T>(array: readonly T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[randomInt(0, array.length)];
};

/**
 * Generates a random boolean with specified probability.
 * @param probability - Probability of true (0.0 to 1.0)
 * @returns Random boolean
 */
export const randomBoolean = (probability: number = 0.5): boolean => {
  return Math.random() < probability;
};

/**
 * Shuffles an array (Fisher-Yates algorithm).
 * Returns a new array, does not mutate original.
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export const shuffle = <T>(array: readonly T[]): T[] => {
  const result = [...array];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
};
