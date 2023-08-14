export type Order = {
  id: number;
  userId: number;
};

export type OrderBody = {
  productIds: number[];
  userId: number;
};
