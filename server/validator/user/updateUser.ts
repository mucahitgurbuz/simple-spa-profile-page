import { celebrate, Joi } from 'celebrate';

export default celebrate({
  body: Joi.object()
    .keys({
      userCode: Joi.string()
        .min(4)
        .max(16)
        .required(),
      fName: Joi.string()
        .min(2)
        .max(64),
      lName: Joi.string()
        .min(2)
        .max(64),
    })
    .unknown(false),
});
