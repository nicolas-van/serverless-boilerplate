# Serverless Boilerplate

`master`: [![Build Status](https://travis-ci.org/nicolas-van/serverless-boilerplate.svg?branch=master)](https://travis-ci.org/nicolas-van/serverless-boilerplate)
`develop`: [![Build Status](https://travis-ci.org/nicolas-van/serverless-boilerplate.svg?branch=develop)](https://travis-ci.org/nicolas-van/serverless-boilerplate)

My personal serverless boilerplate

## How to run

Install dependencies:

```bash
sudo npm install serverless -g
npm install
sls dynamodb install
```

To run a dev server:

```bash
npm run server
```

## How to deploy

[Here are the necessary AWS permissions.](./aws-permissions.json)

`dev` deployment:

```bash
sls create_domain
sls deploy
```

`production` deployment:

```bash
sls create_domain --stage=production
sls deploy --stage=production
```
