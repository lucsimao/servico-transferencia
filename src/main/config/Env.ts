export default {
  app: { port: Number(process.env.APP_PORT) || 3333 },
  servicesAddress: {
    paymentOrders: process.env.PAYMENT_ORDERS_ADDRESS || 'localhost:3334',
  },
};
