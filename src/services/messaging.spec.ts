import { Messaging } from "./messaging";

const createSut = () => {
  return new Messaging();
};

describe("Messaging", () => {
  // afterEach(() => jest.clearAllMocks());

  it("shoud return undefined", () => {
    const sut = createSut();
    expect(sut.sendMessage("Teste")).toBeUndefined();
  });

  it("shoud call console.log once", () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, "log");
    sut.sendMessage("");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it("shoud call console.log with '`Message sent:` message'", () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, "log");
    sut.sendMessage("test");
    expect(consoleSpy).toHaveBeenCalledWith("Message sent: ", "test");
  });
});
