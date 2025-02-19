import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";

import * as route53 from "aws-cdk-lib/aws-route53";

interface DomainStackProps extends cdk.StackProps {
  zoneName: string;
}

export class DomainStack extends cdk.Stack {
  readonly hostedZone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    this.hostedZone = new route53.HostedZone(this, "JSONPathComHostedZone", {
      zoneName: props.zoneName,
    });
  }
}
