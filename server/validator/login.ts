import { celebrate, Joi } from 'celebrate';

export default celebrate({
  query: Joi.object()
    .keys({
      userCode: Joi.string()
        .min(4)
        .max(16)
        .required(),
      password: Joi.string().required(),
    })
    .unknown(false),
});
