import Joi from 'joi';
import JoiDate from '@joi/date';

export default Joi.object({
  amount: Joi.number().required(),
  expectedOn: Joi.extend(JoiDate).date().format('DD-MM-YYYY'),
});
