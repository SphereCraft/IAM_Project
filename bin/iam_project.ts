#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeveloperGroupStack } from '../lib/groups/developers-group';
import { userNameStack } from '../lib/users/user-names-stack';
import { DeveloperPermissionStack } from '../lib/permissions/developers-permissions';
import { OperationsGroupStack } from '../lib/groups/operations-groups';
import { OperationPermissionStack } from '../lib/permissions/operations-permissions';

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

