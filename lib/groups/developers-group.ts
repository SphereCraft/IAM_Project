import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface DeveloperGroupProps extends cdk.StackProps {
    users: iam.User[];
}

export class DeveloperGroupStack extends cdk.Stack {
    public readonly devGroup: iam.Group;

    constructor(scope: Construct, id: string, props?: DeveloperGroupProps) {
        super(scope, id, props);

        this.devGroup = new iam.Group(this, 'DevGroup', {
            groupName: 'Developers'
        });

        props?.users.forEach(user => this.devGroup.addUser(user));
    }
}
