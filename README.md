# Serverless Spotify Token Generator

AWS Cloudformation template for an API Gateway using Lambda to implement [Spotify Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow).

API Gateway has on GET endpoint that calls Lambda function that generates base64 encoded string from `clientId` and `clientSecret` and fetches access token from Spotify.

`clientId` and `clientSecret` are passed as parameters during deploy time (`--parameters file://./parameters.json`). `parameters_example.json` should be filled with real data and renamed to `parameters.json`.

## Known issues

Currently Lambda function is inlined into Cloudformation template which IMHO is not the best solution - missing syntax highlighting, if changed Cloudformation doesn't update it unless some of the parameters change also (e.g. name of the function), copy/pasting is error-prone.

To use npm packages like `node-fetch`, `node_modules` folder should also be uploaded to Lambda which can't be done with inlined function (???). For now I'm using node's native `https` module which is more verbose than `node-fetch`, but doesn't require additional build steps.

## Commands:

Create stack:

`aws cloudformation create-stack --stack-name MYTESTSTACK --template-body file://./lambda-sls.yaml --region 'eu-central-1' --parameters file://./parameters.json --capabilities CAPABILITY_IAM`

Update stack:

`aws cloudformation update-stack --stack-name MYTESTSTACK --template-body file://./lambda-sls.yaml --region 'eu-central-1' --parameters file://./parameters.json --capabilities CAPABILITY_IAM`

List exports:

`aws cloudformation list-exports --region 'eu-central-1'`

`--region` could be omitted by setting it in aws config using `aws configure` (on linux config files are located in `~./aws`).

## References:

[How to list outputs of deployed stacks](https://stackoverflow.com/questions/49301783/how-to-list-all-stacks-outputs-currently-deployed-to-an-aws-account)

[Enable CORS for API Gateway in Cloudformation template](https://forums.aws.amazon.com/thread.jspa?threadID=242093)

[CloudFormation example for API Gateway integration to Lambda function](https://gist.github.com/magnetikonline/c314952045eee8e8375b82bc7ec68e88)

[How to load npm modules in AWS Lambda?](https://stackoverflow.com/questions/34437900/how-to-load-npm-modules-in-aws-lambda)

[Passing Parameters to CloudFormation Stacks with the AWS CLI and Powershell](https://aws.amazon.com/blogs/devops/passing-parameters-to-cloudformation-stacks-with-the-aws-cli-and-powershell/)
