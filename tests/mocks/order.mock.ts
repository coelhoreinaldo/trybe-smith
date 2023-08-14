const allOrders = [
  {
    id: 1,
    userId: 1,
    productIds: [2, 1],
  },
  {
    id: 2,
    userId: 3,
    productIds: [4, 3],
  },
  {
    id: 3,
    userId: 2,
    productIds: [5],
  },
];

const validOrderBody = {
  userId: 1,
  productIds: [2, 1],
};

const createOrder = {
  userId: validOrderBody.userId,
}

const toUpdateProducts = validOrderBody.productIds;

export default { allOrders, validOrderBody, createOrder, toUpdateProducts };
