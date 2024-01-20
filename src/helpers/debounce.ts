export const debounce = (
  callback: (...args: any[]) => void,
  delay: number | undefined
) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay)
  }
}