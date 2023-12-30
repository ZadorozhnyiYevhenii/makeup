// import { addCount, addToCart, decrementCount, removeFromCart } from "../../app/slices/cartSlice";
// import { store } from "../../app/store";
// import { IProd } from "../../types/IProduct";

// const sampleProduct: IProd = {
//   id: 1,
//   name: 'Burberry My Burberry Black',
  
// };

// describe('cartReducer', () => {
//   beforeEach(() => {
//     store.dispatch(removeFromCart(sampleProduct.id))
//   })

//   test('should handle addToCart action', () => {
//     store.dispatch(addToCart(sampleProduct));

//     const { cart, counts } = store.getState().cart;
//     expect(cart).toHaveLength(1);
//     expect(cart[0]).toEqual(sampleProduct);
//     expect(counts[sampleProduct.id]).toBe(1);
//   });

//   test('should handle removeFromCart action', () => {
//     store.dispatch(addToCart(sampleProduct));

//     store.dispatch(removeFromCart(sampleProduct.id));

//     const { cart, counts } = store.getState().cart;
//     expect(cart).toHaveLength(0);
//     expect(counts[sampleProduct.id]).toBeUndefined();
//   });

//   test('should handle addCount action', () => {
//     store.dispatch(addToCart(sampleProduct));

//     store.dispatch(addCount(sampleProduct.id));

//     const { counts } = store.getState().cart;
//     expect(counts[sampleProduct.id]).toBe(2);
//   });

//   test('should handle decrementCount action', () => {

//     store.dispatch(addToCart(sampleProduct));


//     store.dispatch(decrementCount(sampleProduct.id));

//     const { counts } = store.getState().cart;
//     expect(counts[sampleProduct.id]).toBe(1);
//     expect(counts[sampleProduct.id]).not.toBe(0);
//   });
// });
