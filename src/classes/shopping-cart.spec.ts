/* eslint-disable prettier/prettier */
import { CartItem } from "./interfaces/cartItem";
import { Discount } from "./discount";
import { ShoppingCart } from "./shopping-cart";

const createSut = () => {
  const discountMock = createDiscountMoch();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMoch = () => {
  class DiscountMock extends Discount { }
  return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) { }
  }
  return new CartItemMock(name, price);
};

const createSutWithTwoProducts = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItem("T-Shirt", 30);
  const cartItem2 = createCartItem("Skirt", 60);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock, cartItem1, cartItem2 };
}

describe("ShoppingCart", () => {
  it("should be an empty cart when no product id added", () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it("should have 2 cartItems", () => {
    const { sut } = createSutWithTwoProducts();
    expect(sut.items.length).toBe(2);
  });

  it("should test total, totalWithDiscount", () => {
    const { sut } = createSutWithTwoProducts();
    expect(sut.total()).toBe(90);
    expect(sut.totalWithDiscount()).toBe(90);
  });

  it("should add products and clear cart", () => {
    const { sut } = createSutWithTwoProducts();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it("should remove products", () => {
    const { sut } = createSutWithTwoProducts();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it("should call discount.calculate once when totalWithDiscount is called", () => {
    const { sut, discountMock } = createSutWithTwoProducts();
    const discountMockSpy = jest.spyOn(discountMock, "calculate");
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should call discount.calculate with total price when totalWithDiscount is called", () => {
    const { sut, discountMock } = createSutWithTwoProducts();
    const discountMockSpy = jest.spyOn(discountMock, "calculate");
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
