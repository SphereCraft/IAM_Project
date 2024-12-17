import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface OperationGroupProps extends cdk.StackProps {
    users: iam.User[];
}

export class OperationsGroupStack extends cdk.Stack {
    public readonly opsGroup: iam.Group;

    constructor(scope: Construct, id: string, props?: OperationGroupProps) {
        super(scope, id, props);

        this.opsGroup = new iam.Group(this, 'OpsGroup', {
            groupName: 'Operations',
        });

        props?.users.forEach(user => this.opsGroup.addUser(user));
    }
}
