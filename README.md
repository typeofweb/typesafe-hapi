# typesafe-hapi

typesafe-hapi is a fork of [hapi](https://github.com/hapijs/hapi) which aims to improve typesafety. More precisely, this is a fork of [@types/hapi__hapi](https://www.npmjs.com/package/@types/hapi__hapi) because it has just redefined the essential APIs of hapi.

typesafe-hapi currently matches the API of hapi 18.3.x. It was tested with TypeScript 3.4.5.

## How it works
`typesafe-hapi` uses `typesafe-joi` to infer correct type from Joi schemas automatically. It uses possesed type information to typecheck:

* request.query
* request.payload
* request.params
* response

## Example

```ts
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
    const payload = request.payload; // { user: { name: string; email: string; }; } 
    const query = request.query; // { search?: string | null | undefined; }
    const params = request.params; // { id: number; } 

    // return type is also typechecked based on `options.response.schema`
    return {
      id: params.id,
      name: payload.user.name, // string
      email: payload.user.email, // string
      search: query.search, // string | null | undefined
    };
  },
});
```

Neat, huh? See more examples in [index.test-d.ts](https://github.com/mmiszy/typesafe-hapi/blob/master/index.test-d.ts).

## Usage

Import and use hapi from `typesafe-hapi`:

```typescript
import * as Hapi from 'typesafe-hapi'
```

In order to avoid any compatibility issues, and to be able to use existing packages and plugins easily, you should create an alias for `typesafe-hapi` and rename it to just `hapi`. In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    // … other options
    "paths": {
      "hapi": ["node_modules/typesafe-hapi"],
      "joi": ["node_modules/typesafe-joi"]
    }
  }
}
```
