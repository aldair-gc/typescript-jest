/*
# Dependecy Inversion Principle #
Módulos de alto nível não devem depender de módulos de baixo nível. Ambom devem depender de abstrações.
Dependa de abstrações, não de implementações.
Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.
- Classes de baixo nível são aquelas que executam tarefas (os detalhes);
- Classes de alto nível são aquelas que gerenciam as classes de baixo nível.
*/

import { Messaging } from "./services/messaging";
import { Order } from "./classes/order";
import { Persistency } from "./services/persistency";
import { Product } from "./classes/product";
import { ShoppingCart } from "./classes/shopping-cart";
import { NoDiscount } from "./classes/discount";
import { EnterpriseCustomer } from "./classes/customer";

// const discount = new TenPercentDiscount();
const discount = new NoDiscount();
const shoppingCart = new ShoppingCart(discount);
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer("Aldair", "Garros", "000.111.222-33");
const enterpriseCustomer = new EnterpriseCustomer("Company", "000.000.0000/00");

// class MessagingMock implements MessagingProtocol {
//   sendMessage(msg: string): void {
//     console.log("Message sent through MOCK");
//   }
// }

// const messagingMock = new MessagingMock();

const order = new Order(shoppingCart, messaging, persistency, enterpriseCustomer);

shoppingCart.addItem(new Product("Shorts", 19.19));
shoppingCart.addItem(new Product("Skirt", 59.39));
shoppingCart.addItem(new Product("Pants", 99.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
