# typesafe-hapi

typesafe-hapi is a fork of [hapi](https://github.com/hapijs/hapi). More precisely, this is a fork of [@types/hapi__hapi](https://www.npmjs.com/package/@types/hapi__hapi) because it has just redefined the essential APIs of hapi.

typesafe-hapi currently matches the API of hapi 18.3.x. It was tested with TypeScript 3.4.5.

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
