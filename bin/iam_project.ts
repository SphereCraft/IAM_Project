#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeveloperGroupStack } from '../lib/groups/developers-group';
import { userNameStack } from '../lib/users/user-names-stack';
import { DeveloperPermissionStack } from '../lib/permissions/developers-permissions';
import { OperationsGroupStack } from '../lib/groups/operations-groups';
import { OperationPermissionStack } from '../lib/permissions/operations-permissions';
import { FinanceGroupStack } from '../lib/groups/finance-group';
import { FinancePermissionStack } from '../lib/permissions/finance-permissions';
import { AnalystGroupStack } from '../lib/groups/analyst-group';
import { AnalystPermissionStack } from '../lib/permissions/analyst-permissions';


const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const devUserStack = new userNameStack(app, 'DeveloperUserStack', {
    env,
    users: ['developer1', 'developer2', 'developer3', 'developer4']
});

const devGroupStack = new DeveloperGroupStack(app, 'DeveloperGroupStack', {
    env,
    users: devUserStack.users
});

new DeveloperPermissionStack(app, 'DeveloperPermissionStack', {
    env,
    group: devGroupStack.devGroup
});

const opsUserStack = new userNameStack(app, 'OperationUserStack', {
    env,
    users: ['operator1', 'operator2']
});

const opsGroupStack = new OperationsGroupStack(app, 'OperationsGroupStack', {
    env,
    users: opsUserStack.users
});

new OperationPermissionStack(app, 'OperationPermissionStack', {
    env,
    group: opsGroupStack.opsGroup
});

const finUserStack = new userNameStack(app, 'FinanceUserStack', {
    env,
    users: ['financerManager']
});

const finGroupStack = new FinanceGroupStack(app, 'FinanceGroupStack', {
    env,
    users: finUserStack.users
});

new FinancePermissionStack(app, 'FinancePermissionStack', {
    env,
    group: finGroupStack.finGroup
});

const anaUserStack = new userNameStack(app, 'AnaylstUserStack', {
    env,
    users: ['analyst1', 'analyst2', 'analyst3']
});

const anaGroupStack = new  AnalystGroupStack(app, 'AnalystGroupStack', {
    env,
    users: anaUserStack.users
});

new AnalystPermissionStack(app, 'AnalystPermissionStack', {
    env,
    group: anaGroupStack.anaGroup
});
