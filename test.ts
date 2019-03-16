import Hapi from 'typesafe-hapi'
import Joi from 'typesafe-joi';

const server = new Hapi.Server();

/**
 * User's codebase
 */
const payloadSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  }).required(),
}).required();

const responseSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
}).required();

server.route({
  method: 'POST',
  path: '/',
  options: {
    validate: {
      payload: payloadSchema,
    },
    response: {
      schema: responseSchema,
    },
  },
  handler(request) {
    // type of `payload` is automatically inferred based on `options.validate.payload` schema
    const payload = request.payload;

    // return type is also automatically inferred based on `options.response.schema`
    return {
      id: String(Math.random()),
      name: payload.user.name,
      email: payload.user.email,
    };
  },
})
