import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class DeveloperUserStack extends cdk.Stack {
    public readonly developer1: iam.User;
    public readonly developer2: iam.User;
    public readonly developer3: iam.User;
    public readonly developer4: iam.User;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

         this.developer1 = new iam.User(this, 'DevUser1', {
            userName: 'developer1',
            passwordResetRequired: true,
        });

         this.developer2 = new iam.User(this, 'DevUser2', {
            userName: 'developer2',
            passwordResetRequired: true,
        });

        this.developer3 = new iam.User(this, 'DevUser3', {
            userName: 'developer3',
            passwordResetRequired: true,
        });

        this.developer4 = new iam.User(this, 'DevUser4', {
            userName: 'developer4',
            passwordResetRequired: true,
        });
    }
}
