import { celebrate, Joi } from 'celebrate';

export default celebrate({
  body: Joi.object()
    .keys({
      newPassword: Joi.string()
        .min(64)
        .max(64)
        .required(),
    })
    .unknown(false),
});
