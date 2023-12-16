import { IProd } from "../types/IProduct";

export const uniqueArray = <T extends keyof IProd>(
  arr: IProd[],
  propertyName: T
) => {
  const unique = new Set(arr.map(item => item[propertyName]));

  const filteredUnique = Array.from(unique).filter(value => value !== undefined);

  return filteredUnique;
};