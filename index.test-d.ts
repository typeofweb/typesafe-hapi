import Hapi from 'hapi';
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

const querySchema = Joi.object({
  search: Joi.string().optional().allow('', null),
}).required();

const paramsSchema = Joi.object({
  id: Joi.number().required()
}).required();

const responseSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  search: Joi.string().optional().allow(null),
}).required();

server.route({
  method: 'POST',
  path: '/:id',
  options: {
    validate: {
      payload: payloadSchema,
      query: querySchema,
      params: paramsSchema,
    },
    response: {
      schema: responseSchema,
    },
  },
  handler(request) {
    // type of `payload` is automatically inferred based on `options.validate.payload` schema
    const payload = request.payload; // $ExpectType { user: { name: string; email: string; } & {}; } & {}
    const query = request.query; // $ExpectType {} & { search?: string | null | undefined; }
    const params = request.params; // $ExpectType { id: number; } & {}

    // return type is also automatically inferred based on `options.response.schema`
    return {
      id: params.id,
      name: payload.user.name, // $ExpectType string
      email: payload.user.email, // $ExpectType string
      search: query.search, // $ExpectType string | null | undefined
    };
  },
});

server.route({
  method: 'GET',
  path: '/health-check',
  options: {
    description: 'Health check endpoint',
    tags: ['api'],
  },
  handler(_request) {
    return null;
  },
});
