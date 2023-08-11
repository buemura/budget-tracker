export function exlcudeKeysFromArray<T>(
  data: T | T[],
  keysToRemove: string[],
): T | T[] {
  if (Array.isArray(data)) {
    return data.map((item) => excludeKeysFromObject(item, keysToRemove));
  }

  return excludeKeysFromObject(data, keysToRemove);
}

export function excludeKeysFromObject<T>(obj: T, keysToRemove: string[]): T {
  const clonedObj = { ...obj };
  keysToRemove.forEach((key) => delete clonedObj[key]);
  return clonedObj;
}
