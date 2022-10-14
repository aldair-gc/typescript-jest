import { IndividualCustomer, EnterpriseCustomer } from "./customer";

const createIndividualCustomer = (firstName: string, lastName: string, cpf: string): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks());

describe("IndividualCustomer", () => {
  it("shoud have firstName, lastName and cpf", () => {
    const individualCustomer = createIndividualCustomer("Aldair", "Garros", "000.000.000-00");
    expect(individualCustomer.firstName).toBe(individualCustomer.firstName);
    expect(individualCustomer.lastName).toBe(individualCustomer.lastName);
    expect(individualCustomer.cpf).toBe(individualCustomer.cpf);
  });

  it("shoud have methods: getName, getIdn (individualCustomer)", () => {
    const individualCustomer = createIndividualCustomer("Aldair", "Garros", "000.000.000-00");
    expect(individualCustomer.getName()).toBe("Aldair Garros");
    expect(individualCustomer.getIDN()).toBe(individualCustomer.cpf);
  });
});

describe("EnterpriseCustomer", () => {
  it("shoud have name and cpnj", () => {
    const enterpriseCustomer = createEnterpriseCustomer("Company", "00.000.000/0000-0");
    expect(enterpriseCustomer.name).toBe("Company");
    expect(enterpriseCustomer.cnpj).toBe("00.000.000/0000-0");
  });

  it("shoud have methods: getName, getIdn (enterpriseCustomer)", () => {
    const enterpriseCustomer = createEnterpriseCustomer("Company", "00.000.000/0000-0");
    expect(enterpriseCustomer.getName()).toBe("Company");
    expect(enterpriseCustomer.getIDN()).toBe("00.000.000/0000-0");
  });
});
