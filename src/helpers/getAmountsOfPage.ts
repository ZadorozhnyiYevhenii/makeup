export const amountOfPages = (totalProducts: number | undefined, amountProductPerPage: number) => {
  if (totalProducts) {
    return Math.ceil(totalProducts / amountProductPerPage);
  }
};