import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


export interface DeveloperPermissionProps extends cdk.StackProps {
    group: iam.Group;
}

export class DeveloperPermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DeveloperPermissionProps) {
        super(scope, id, props);

        const devPolicy = new iam.ManagedPolicy(this, 'DevPolicy', {
            managedPolicyName: 'DeveloperAccessPolicy',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        'ec2:*',
                        's3:*',
                        'logs:DescribeLogGroups',
                        'logs:DescribeLogStreams',
                        'logs:FilterLogEvents',
                        'logs:GetLogEvents',
                        ],
                    resources: ['*'],
                }),
            ],
        });
        props.group.addManagedPolicy(devPolicy);
    }
}
