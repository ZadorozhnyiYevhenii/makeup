import { IProd } from "../types/IProduct";
// <T extends keyof IProd>

export const uniqueArray = (
  arr: IProd[] | undefined,
  propertyName: string
) => {
  const unique = new Set(arr?.map(item => {
    const props = propertyName.split('.');
    let nestedValue: any = item;
    for (const prop of props) {
      nestedValue = nestedValue[prop];
    }
    return nestedValue;
  }));

  const filteredUnique = Array.from(unique).filter(value => value !== undefined);

  return filteredUnique;
};
