#!/bin/sh

echo "npm install"
npm install || exit -1
echo "npm install -g serverless"
npm install -g serverless || exit -1
echo "sls create_domain"
sls create_domain --stage=$1 || exit -1
echo "sls deploy"
sls deploy --stage=$1 || exit -1