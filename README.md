# Wind Alert

Alerts wind freaks about big days.

## Prerequisites

Install dependencies:

```bash
yarn install
```

## Running Locally

*(optional)* Use `.env.development.local` file to point API URL to the API running locally:

```
REACT_APP_API_URL=http://localhost:3030
```

Run the application:

```bash
yarn start
```

## Building for Production

```bash
yarn build
```

## Deployment

Prerequisites:

1. Create Heroku app.
2. Set API URL [Heroku environment variable].

```bash
git push heroku master
```


[Heroku environment variable]: https://devcenter.heroku.com/articles/config-vars
