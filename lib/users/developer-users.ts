import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface DeveloperUserProps extends cdk.StackProps {
    users?: string[];
}

export class DeveloperUserStack extends cdk.Stack {
    public readonly users: iam.User[];

    constructor(scope: Construct, id: string, props?: DeveloperUserProps) {
        super(scope, id, props);

        const userNames = props?.users || ['developer1', 'developer2', 'developer3', 'developer4'];

        const passwordSecret = new secretsmanager.Secret(this, 'DevPasswordSecret', {
            secretName: 'dev-passwords',
            generateSecretString: {
                secretStringTemplate: JSON.stringify({ username: 'developer' }),
                generateStringKey: 'password',
                passwordLength: 16,
                excludePunctuation: true,
            },
        });

        this.users = userNames.map((userName: string)  =>
            new iam.User(this, `DevUser-${userName}`, {
                userName,
                password: passwordSecret.secretValueFromJson('password'),
                passwordResetRequired: true,
            })
        );
    }
}
