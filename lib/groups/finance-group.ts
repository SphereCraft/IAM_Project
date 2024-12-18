import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { warn } from 'console';

export interface FinanceGroupProps extends cdk.StackProps {
    users: iam.User[];
}

export class FinanceGroupStack extends cdk.Stack {
    public readonly finGroup: iam.Group;

    constructor(scope: Construct, id: string, props?: FinanceGroupProps) {
        super(scope, id, props);

        this.finGroup = new iam.Group(this, 'FinGroup', {
            groupName: 'Finance',
        });

        props?.users.forEach(user => this.finGroup.addUser(user));
    }
}
