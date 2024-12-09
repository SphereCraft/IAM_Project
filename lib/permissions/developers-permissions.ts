import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs'; 
import { DeveloperGroupStack } from '../Groups/developers-group';

export class DeveloperPermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const developerGroupStack = new DeveloperGroupStack(scope, 'DeveloperGroupStack');

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
        
        developerGroupStack.devGroup.addManagedPolicy(devPolicy);
    }
}
