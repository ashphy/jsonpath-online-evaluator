#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { InfraStack } from "../lib/infra-stack";
import { DomainStack } from "../lib/domain-stack";
import { CertificateStack } from "../lib/certificate-stack";

const app = new cdk.App();
cdk.Tags.of(app).add("project", "JSONPathOnlineEvaluator");

const zoneName = "jsonpath.com";
const domainName = "jsonpath.com";

const domainStack = new DomainStack(app, "JSONPathOnlineEvaluatorDomainStack", {
  zoneName,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
  crossRegionReferences: true,
});

const certificateStack = new CertificateStack(
  app,
  "JSONPathOnlineEvaluatorCertificateStack",
  {
    hostedZone: domainStack.hostedZone,
    domainName,
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" },
    crossRegionReferences: true,
  }
);

new InfraStack(app, "JSONPathOnlineEvaluatorInfraStack", {
  hostedZone: domainStack.hostedZone,
  domainName,
  certificate: certificateStack.certificate,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  crossRegionReferences: true,
});
