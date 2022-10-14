import { Product } from "./product";

const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe("Product", () => {
  // afterEach(() => jest.clearAllMocks());

  it("shoud have properties name and price", () => {
    const sut = createSut("T-shirt", 19.9);
    expect(sut).toHaveProperty("name", sut.name);
    expect(sut.price).toBeCloseTo(sut.price);
  });
});
