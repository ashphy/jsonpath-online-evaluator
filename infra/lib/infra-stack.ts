import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";

import type * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";

interface InfraStackProps extends cdk.StackProps {
  hostedZone: route53.IHostedZone;
  domainName: string;
  certificate: acm.ICertificate;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const addCacheControlFunction = new cloudfront.Function(
      this,
      "AddCacheControlFunction",
      {
        code: cloudfront.FunctionCode.fromFile({
          filePath: "lib/cloudfront-functions/add-cache-control-header.js",
        }),
        runtime: cloudfront.FunctionRuntime.JS_2_0,
      }
    );

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      comment: "JSONPath Online Evaluator",
      domainNames: [props.domainName],
      certificate: props.certificate,
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin:
          cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
            websiteBucket
          ),
        functionAssociations: [
          {
            function: addCacheControlFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
          },
        ],
      },
    });

    new route53.ARecord(this, "CloudFrontAliasRecord", {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    new route53.AaaaRecord(this, "CloudFrontV6AliasRecord", {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    // Outputs
    new cdk.CfnOutput(this, "WebsiteBucketURI", {
      value: `s3://${websiteBucket.bucketName}`,
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });
  }
}
