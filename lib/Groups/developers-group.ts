import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DeveloperUserStack } from '../users/developer-users';

export class DeveloperGroupStack extends Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope, id, props);

        const devGroup = new iam.Group(this, 'DevGroup', {
            groupName: 'Developers', 
        });

        const developerUserStack = new DeveloperUserStack(scope, 'DeveloperUserStack');

        devGroup.addUser(developerUserStack.developer1);
        devGroup.addUser(developerUserStack.developer2);
        devGroup.addUser(developerUserStack.developer3);
        devGroup.addUser(developerUserStack.developer4);
    }
}
