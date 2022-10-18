/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { CartItem } from "./interfaces/cartItem";
import { CustomerOrder } from "./interfaces/customer-protocol";
import { MessagingProtocol } from "./interfaces/messaging-protocol";
import { PersistencyProtocol } from "./interfaces/persistency-protocol";
import { ShoppingCartProtocol } from "./interfaces/shopping-cart-protocol";
import { Order } from "./order";

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem>[] {
    return [];
  }
  addItem(item: CartItem): void { }
  removeItem(index: number): void { }
  total(): number { return 1 }
  totalWithDiscount(): number { return 2 }
  isEmpty(): boolean { return false }
  clear(): void { }
}

class MessagingMock implements MessagingProtocol { sendMessage() { } }

class PersistencyMock implements PersistencyProtocol { saveOrder() { } }

class CustomerMock implements CustomerOrder {
  getName() { return "" }
  getIDN() { return "" }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();
  const sut = new Order(shoppingCartMock, messagingMock, persistencyMock, customerMock);
  return { sut, shoppingCartMock, messagingMock, persistencyMock, customerMock };
}

describe("Order", () => {
  it("should not checkout if cart is empty", () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "isEmpty").mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe("open");
  });

  it("should checkout if cart is not empty", () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "isEmpty").mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe("closed");
  });

  it("should send email to customer", () => {
    const { sut, messagingMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(messagingMock, "sendMessage");
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should save order", () => {
    const { sut, persistencyMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(persistencyMock, "saveOrder");
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should clear cart", () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "clear");
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
