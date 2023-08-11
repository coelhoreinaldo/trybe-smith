import { Product } from "../../src/types/Product";

const validProduct = {
  name: "Lança de Athena",
  orderId: 3,
  price: "7 peças de ouro",
};

const productWithoutName = {
  name: '',
  orderId: 3,
  price: "7 peças de ouro",
};

const productWithoutOrderId = {
  name: 'Lança de Athena',
  orderId: '',
  price: "7 peças de ouro",
};

const productWithoutPrice = {
  name: 'Lança de Athena',
  orderId: 3,
  price: "",
};

export default { validProduct, productWithoutName, productWithoutOrderId, productWithoutPrice }