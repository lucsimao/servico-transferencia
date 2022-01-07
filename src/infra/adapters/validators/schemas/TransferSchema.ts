import Joi from 'joi';

export default Joi.object({
  amount: Joi.number().required(),
  expectedDate: Joi.date().iso(),
});
