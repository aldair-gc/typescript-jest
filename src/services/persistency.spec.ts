import { Persistency } from "./persistency";

describe("Persistency", () => {
  afterEach(() => jest.clearAllMocks());

  it("shoud return undefined", () => {
    const sut = new Persistency();
    expect(sut.saveOrder()).toBeUndefined();
  });

  it("shoud call console.log once", () => {
    const sut = new Persistency();
    const consoleSpy = jest.spyOn(console, "log");
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it("shoud call console.log with 'Purchase saved'", () => {
    const sut = new Persistency();
    const consoleSpy = jest.spyOn(console, "log");
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledWith("Purchase saved");
  });
});
