import { addCount, addToCart, decrementCount, removeFromCart } from "../../app/slices/cartSlice";
import { store } from "../../app/store";

const sampleProduct = {
  id: 1,
  name: 'Burberry My Burberry Black',
  type: "fragrancies",
  quantity: 50,
  price: 500,
  img: ["https://u.makeup.com.ua/g/gj/gj9mojcjeaga.jpg", 'https://u.makeup.com.ua/n/nv/nv58d9az3ukf.jpg', 'https://u.makeup.com.ua/t/tr/trvhbjgtp5vz.jpg', 'https://u.makeup.com.ua/a/ap/apusvqdqujjl.jpg'],
  country: "UK",
  sex: 'Women',
  productType: 'Parfum',
  smellType: 'восточные, цветочные',
  начальнаяНота: 'Жасмин',
  нотаСердца: 'Персик, Роза',
  конечнаяНота: 'Амбра, Пачули',
  value: '200$',
  code: '14141',
  brand: 'Burberry',
  description: 'Восточные ароматы с цветочными оттенками всегда будут актуальны среди тех, кто любит привлекать внимание окружающих и выражать себя посредством запахов. Парфюмированная вода Burberry My Burberry Black станет той маленькой роскошью, которую вы сможете позволить себе каждый день. Мягкое и ненавязчивое благоухание персика и розы создают чарующий дует, который убаюкивает, уносит в мир грез и приятных воспоминаний. Такой фруктово-цветочный сад, сдобренный утонченными жасминовыми оттенками точно отражает всю суть женского обаяния и очарования. Приземистые ноты амбры и пачули, сливаясь с жизнерадостными тонами парфюма, создают запоминающийся и яркий шлейф. Это аромат утонченной леди, которая буквально купается в собственной красоте и великолепии. Ей не нужно подтверждение своего великолепия, потому что восторженные толпы поклонников говорят намного красноречивее слов.'
};

describe('cartReducer', () => {
  beforeEach(() => {
    store.dispatch(removeFromCart(sampleProduct.id))
  })

  test('should handle addToCart action', () => {
    store.dispatch(addToCart(sampleProduct));

    const { cart, counts } = store.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual(sampleProduct);
    expect(counts[sampleProduct.id]).toBe(1);
  });

  test('should handle removeFromCart action', () => {
    store.dispatch(addToCart(sampleProduct));

    store.dispatch(removeFromCart(sampleProduct.id));

    const { cart, counts } = store.getState().cart;
    expect(cart).toHaveLength(0);
    expect(counts[sampleProduct.id]).toBeUndefined();
  });

  test('should handle addCount action', () => {
    store.dispatch(addToCart(sampleProduct));

    store.dispatch(addCount(sampleProduct.id));

    const { counts } = store.getState().cart;
    expect(counts[sampleProduct.id]).toBe(2);
  });

  test('should handle decrementCount action', () => {

    store.dispatch(addToCart(sampleProduct));


    store.dispatch(decrementCount(sampleProduct.id));

    const { counts } = store.getState().cart;
    expect(counts[sampleProduct.id]).toBe(1);
    expect(counts[sampleProduct.id]).not.toBe(0);
  });
});
