import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';


export interface OperationPermissionsProps extends cdk.StackProps {
    group: iam.Group;
}

export class OperationPermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: OperationPermissionsProps) {
        super(scope, id, props);

        const opsPolicy = new iam.ManagedPolicy(this, 'OpsPolicy', {
            managedPolicyName : 'OperationAccessPolicy',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        'ec2:*',
                        'cloudwatch:*',
                        'ssm:*',
                        'rds:*',
                        ],
                    resources: ['*'],
                }),
            ],
        });
        props.group.addManagedPolicy(opsPolicy);
    }
}
