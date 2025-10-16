

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};


export const randomElement = <T>(array: readonly T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[randomInt(0, array.length)];
};


export const randomBoolean = (probability: number = 0.5): boolean => {
  return Math.random() < probability;
};


// Shuffles an array (Fisher-Yates algorithm).

export const shuffle = <T>(array: readonly T[]): T[] => {
  const result = [...array];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    const temp = result[i];
    const swapVal = result[j];
    if (temp !== undefined && swapVal !== undefined) {
      result[i] = swapVal;
      result[j] = temp;
    }
  }
  
  return result;
};
