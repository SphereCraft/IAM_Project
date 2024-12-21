import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface AnalystGroupProps extends cdk.StackProps {
    users:iam.User[];
}

export class AnalystGroupStack extends cdk.Stack {
    public readonly anaGroup: iam.Group;

    constructor(scope: Construct, id: string, props?: AnalystGroupProps) {
        super(scope, id, props);

        this.anaGroup = new iam.Group(this, 'AnaGroup', {
            groupName: 'Analysts'
        });

        props?.users.forEach(user => this.anaGroup.addUser(user));
    }
}
