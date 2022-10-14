import { Discount, FiftyPercentDiscount, TenPercentDiscount, NoDiscount } from "./discount";

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe("Product", () => {
  // afterEach(() => jest.clearAllMocks());

  it("shoud have no discount", () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBeCloseTo(10.99);
  });

  it("shoud apply 50% discount", () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(16.5)).toBeCloseTo(8.25);
  });

  it("shoud apply 10% discount", () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(16.2)).toBeCloseTo(14.58);
  });
});
