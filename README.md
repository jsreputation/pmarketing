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

```bash
yarn start:{app}:[staging|production]
```

e.g.
```bash
yarn start:perx-demo:staging
```

### Generating new components
```bash
yarn nx g [c|m] [component-name] --project=[app-project-name]
```
`app-project-name` can be found in the root angular.json under the project key

e.g. 
```bash
# a library example
yarn nx g c my-component --project=blackcomb-pages

# an app example
yarn nx g m my-component --project=blackcomb
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

Section in progress

## Local Deployment

Doing this allows you to emulate your build as it would in live environments. It does not live reload.

#### Example

You should have an entry in the config.json which is your Local IP i.e
```json
"endpoints": {
  ...
  "192.168.1.202": {
    "account_id": "generic-staging"
  }
}
```

Build the perx demo app:
```
docker build -t microsite-apps-ng . --build-arg app=perx-demo --build-arg env=staging --build-arg appbase=blackcomb
```

Build specific tenant app: 
```
docker build -t microsite-apps-ng . --build-arg app=bdo --build-arg env=staging
```

Run the image and expose on port 8000
```
docker run -p 8000:8000 --rm --name microsite-apps-ng microsite-apps-ng
```

Run the image and expose on port 8000 
```
docker run -p 8000:8000 -v $(pwd)/config.json:/secrets/api-config/config.json -e API_CONFIG_PATH=/secrets/api-config/config.json --rm microsite-apps-ng
```

Copy the missing config.json to your active docker container
```
docker ps

# copy the docker container_id
docker cp backend/appauth-server/config.json <docker_container_id>:/service/express/config.json
```

you should have the server now listening on http://localhost:8000

# TAG Deployment

See the [wiki](../../wiki/Tag-Deployment) page.

# Manual deployment
- Build and push Docker image
  ```bash
  # Authenticate to DockerHub
  docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASS}
  # Pass valid tag to build_and_push script. I.e. perx-demo-staging-0.0.1
  ./scripts/build_and_push.sh perx-demo-staging-0.0.1
  ```
- Pull/clone `git@github.com:PerxTech/microsite-deploy.git` repo
- Folow [manual deploy](https://github.com/PerxTech/microsite-deploy#deploy-manually-from-local-pc) procedure
