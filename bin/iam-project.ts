#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeveloperGroupStack } from '../lib/Groups/developers-group';
import { DeveloperUserStack } from '../lib/users/developer-users';
import { DeveloperPermissionStack } from '../lib/permissions/developers-permissions';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

const userStack = new DeveloperUserStack(app, 'DeveloperUserStack', {
    env,
    users: ['developer1', 'developer2', 'developer3', 'developer4']
});

const groupStack = new DeveloperGroupStack(app, 'DeveloperGroupStack', {
    env,
    users: userStack.users
});

new DeveloperPermissionStack(app, 'DeveloperPermissionStack', {
    env,
    group: groupStack.devGroup
});
