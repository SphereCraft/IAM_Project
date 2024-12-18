import * as iam from 'aws-cdk-lib/aws-iam';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface FinancePermissionsProps extends cdk.StackProps {
    group: iam.Group;
}

export class FinancePermissionStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: FinancePermissionsProps) {
        super(scope, id, props);

        const finPolicy = new iam.ManagedPolicy(this, 'FinPolicy', {
            managedPolicyName: 'FinanceAccessPolicy',
            statements: [
                new iam.PolicyStatement({
                    actions: [
                        'ce:*',
                        'budgets:ViewBudget',
                        'budgets:DescribeBudget',
                        'budgets:DescribeBudgets',
                        'budgets:DescribeBudgetsPerformanceHistory',        
                    ],
                    resources: ['*'],
                }),
            ],
        });
        props.group.addManagedPolicy(finPolicy);
    }
}
