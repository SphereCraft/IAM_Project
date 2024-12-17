import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';


export interface userNameProps extends cdk.StackProps {
    users: string[];
}

export class userNameStack extends cdk.Stack {
    public readonly users: iam.User[];

    constructor(scope: Construct, id: string, props: userNameProps) {
        super(scope, id, props);

        const userNames = props.users;

        const passwordSecret = new secretsmanager.Secret(this, 'PasswordSecret', {
            secretName: 'user-passwords',
            generateSecretString: {
                secretStringTemplate: JSON.stringify({ username: 'generic-user' }),
                generateStringKey: 'password',
                passwordLength: 16,
                excludePunctuation: true,
            },
        });

        this.users = userNames.map((userName: string)  =>
            new iam.User(this, `User-${userName}`, {
                userName,
                password: passwordSecret.secretValueFromJson('password'),
                passwordResetRequired: true,
            })
        );
    }
}
