import express from 'express';
import productRouter from './routers/product.router';
import orderRouter from './routers/order.router';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).send('funcionando'));

app.use(productRouter);
app.use(orderRouter);

export default app;
