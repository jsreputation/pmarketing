# Essential reading

Please read the [Coding Guidelines](coding-guidelines.md) before starting

# Getting Started

Download/Install dependencies

```bash
yarn
```

Global build (might be lengthy and generally useless)

```bash
yarn nx run-many --target=build --all
```

Global test

```bash
yarn nx run-many --target=test --all
```

Global lint

```bash
yarn nx run-many --target=lint --all
```

# Dev bootstrap

To start working on a specific app, eventually generate the config using something like this:

```bash
yarn env-cmd -f apps/blackcomb-light/env/blackcomb-light.staging ts-node --project tsconfig.node.json apps/blackcomb-light/set-env.ts
```

Then launch the app using

```bash
yarn nx serve <app>
```

### node express proxy

Create `backend/apputh-server/config.json` with the following format. Ask someone for the secrets

```json
{
  "endpoints": {
    "microsite.perxtech.org": {
      "account_id": "2"
    },
    "localhost:4200": {
      "account_id": "3"
    }
  },
  "credentials": {
    "2": {
      "target_url": "https://whistler-api-dev.perxtech.org/cognito/users",
      "perx_access_key_id": "",
      "perx_secret_access_key": ""
    },
    "3": {
      "target_url": "https://api.perxtech.io",
      "perx_access_key_id": "",
      "perx_secret_access_key": ""
    }
  }
}
```

Run the node server for login/theming api capability

```bash
yarn nx serve appauth-server
```

# Philosophy

- Reusable components seat under libs.
- Deployable apps seat under apps.
- Currently it is on the base one app per microsite.
- Apps should mostly be basic wrappers which style and aggregate the components in a coherent routable app.

# Rules

- Components in libs should not use any router feature.
- Components in libs should instead trigger events, that should be caught by the parent app to update the routing if necessary.

# Module Dependencies

When importing the following Modules you will also have to include sister modules with `forRoot()` declarations (Until a config service is made):

### AuthenticationModule

```typescript
import {
  AuthenticationModule,
} from '@perxtech/core';
import { environment } from '../environments/environment';

@NgModule({
...
imports: [
  AuthenticationModule.forRoot({env: environment}),
]
})

```

### RewardsModule

```typescript
import {
  RewardsModule,
  VouchersModule,
} from '@perxtech/core';
import { environment } from '../environments/environment';

@NgModule({
...
imports: [
  RewardsModule.forRoot({env: environment}),
  VouchersModule.forRoot({env: environment}),
]
})

```

## Local Deployment

Doing this allows you to emulate your build on the server. It does not live reload because it is set up for server side rendering.

to build the prudential shake the tree app:

```
docker build -t microsite-apps-ng . --build-arg app=prudential
```

we expose port 8000 in the dockerfile

```
docker run -p 8000:8000 --rm --name microsite-apps-ng microsite-apps-ng
```

you should have the server now listening on `http://localhost:8000

to find the process list

```
docker ps -a
```

to kill the process

```
docker rm processname

```

# TAG Deployment

See the [wiki](../../wiki/Tag-Deployment) page.
