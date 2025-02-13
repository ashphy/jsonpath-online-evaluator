import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";

import type * as route53 from "aws-cdk-lib/aws-route53";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

interface CertificateStackProps extends cdk.StackProps {
  hostedZone: route53.IHostedZone;
  domainName: string;
}

export class CertificateStack extends cdk.Stack {
  readonly certificate: acm.Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    this.certificate = new acm.Certificate(this, "Certificate", {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(props.hostedZone),
    });
  }
}
