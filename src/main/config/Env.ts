export default {
  app: { port: Number(process.env.APP_PORT) || 3333 },
  servicesAddress: {
    paymentOrders:
      process.env.PAYMENT_ORDERS_ADDRESS || 'http://localhost:3334',
  },
  rateLimiter: {
    ms: Number(process.env.RATE_LIMITER_MS) || 1 * 60 * 1000,
    max: Number(process.env.RATE_LIMITER_MAX) || 10,
  },
};
