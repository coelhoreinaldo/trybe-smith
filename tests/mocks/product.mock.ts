import { Product } from "../../src/types/Product";

const validProduct = {
  name: "Lança de Athena",
  orderId: 3,
  price: "7 peças de ouro",
};

const productWithoutName = {
  name: "",
  orderId: 3,
  price: "7 peças de ouro",
};

const productWithoutOrderId = {
  name: "Lança de Athena",
  orderId: "",
  price: "7 peças de ouro",
};

const productWithoutPrice = {
  name: "Lança de Athena",
  orderId: 3,
  price: "",
};

const productWithInvalidFields = {
  name: "Lança de Athena",
  orderId: 3,
  price: "7",
}

const allProducts = [
  {
    id: 1,
    name: "Excalibur",
    price: "10 peças de ouro",
    orderId: 1,
  },
  {
    id: 2,
    name: "Espada Justiceira",
    price: "20 peças de ouro",
    orderId: 1,
  },
  {
    id: 3,
    name: "Lira de Orfeu",
    price: "1 peça de ouro",
    orderId: 2,
  },
  {
    id: 4,
    name: "Armadura de Aquiles",
    price: "1 peça de ouro",
    orderId: 2,
  },
  {
    id: 5,
    name: "Harpa de Dagda",
    price: "15 peças de ouro",
    orderId: 3,
  },
  {
    id: 5,
    name: "Harpa de Dagda",
    price: "15 peças de ouro",
    orderId: 3,
  },
];

export default {
  validProduct,
  productWithoutName,
  productWithoutOrderId,
  productWithoutPrice,
  productWithInvalidFields,
  allProducts
};
