# WombleTech Admin UI

Admin SPA to talk to serverless back-end. Authed via AWS Cognito.

## Getting Started

Regular Node stuff. Everything's in `app/`.

```bash
cd app      # just to get there
nvm use     # sync up on node/npm versions
yarn install # install dependencies
yarn start   # build and serve the app locally, with hot-reloading
```

Linting and testing are also configured.

```bash
cd app
yarn test              # check lint & test
npm run lint -- --fix # automatically fix lint issues (where possible)
```

## Application architecture

The app largely follows a "clean architecture" philosophy.

- There's a `domain` layer that encapsulates abstract domain concepts, and
  presents interfaces to be fulfilled.
- A `data` layer that contains platform bindings, such as API clients.
- And a `presentation` layer for user-feature concerns (UI and use cases).
- All tied together with `config`. The dependency graph is the entry point for
  non-framework instantiation, and exposes the use cases for UI access.

## Contributing

Talk to us on Slack, get involved :)

## Licence

See [attached licence file](LICENSE).
