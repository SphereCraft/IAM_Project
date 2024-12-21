import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


export interface AnalystPermissionProps extends cdk.StackProps {
    group: iam.Group;
}

export class AnalystPermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: AnalystPermissionProps) {
        super(scope, id, props);

        const anaPolicy = new iam.ManagedPolicy(this, 'AnaPolicy', {
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        "s3:GetObject",
                        "s3:ListBucket",
                        "rds:DescribeDBInstances",
                        "rds:DescribeDBSnapshots",
                        "rds:DescribeDBClusterSnapshots",
                        "rds:DescribeDBClusters",
                        "rds:ListTagsForResource",
                    ],
                    resources: ['*'],
                }),
            ],
        });
        props.group.addManagedPolicy(anaPolicy);
    }
}
