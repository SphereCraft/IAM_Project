StartUpCo Security Development

StartupCo, a fast-growing tech startup that recently launched their first product — a fitness tracking application.
They’ve been using AWS for three months, initially setting up their infrastructure quickly to meet launch deadlines.
Now that their product is live, they need to address their cloud security fundamentals. The company has 10 employees
who all currently share the AWS root account credentials to access and manage their cloud resources.
This practice started when they were moving quickly to launch, but now their CTO recognizes the security risks this poses.

As I see there are a few potential risks within their security and IAM policies.

![Current Architecture](./lib/docs/StartUpCoProject.drawio.png)

Team Structure & Access Needs

    4 Developers (need EC2 and S3 access)
    2 Operations (need full infrastructure access)
    1 Finance Manager (needs cost management access)
    3 Data Analysts (need read-only access to data resources)

With this information we need to ensure the account is secure immediately. The ‘root’ account or ‘admin’ account 
should only be for the initial creation of the account and for any account related issues. From this ‘admin account,
we need to create a new AWS account attached to this management account and from there create all the users and 
groups needed from within the companies guidelines. We would also need to make sure we have secure passwords 
implemented and MFA implemented to get an extra layer of security. This need to be applied to all user accounts.

Adding a strong password policy using the console, this can also be done using terraform or CDK.

![Strong password configuration](./lib/docs/Password_Policy.png)  
![Securing root/management account](./lib/docs/root_account.png)

Team Structure & Access Needs

    4 Developers (need EC2 and S3 access)
    2 Operations (need full infrastructure access)
    1 Finance Manager (needs cost management access)
    3 Data Analysts (need read-only access to data resources)

These are the users that the company require, as this is a personal project, I cannot create all 10 users due to
needing all email addresses, etc, so will just be showing the creation of the user groups. But will be implementing
all the changes in IaC (Infrastructure as code) using Terraform.

So why do we need user groups?

By creating user group we can can, add or modify permission to many users at the same time to make it a quicker and
more efficient process. This can all be done within the AWS console, so why use IaC and terraform? Again, for speed, 
efficiency and to eliminate human error. The console is great, but jumping from screen to screen humans can soon 
forget what they have clicked on and maybe even misclick allowing the incorrect permissions opening up more security 
risks . With just a few line of code we can create a quick, efficient and reliable structure that can be reused time 
and time again.


The first group is for the developers:

    EC2 management
    S3 access for application files
    CloudWatch logs viewing

![Developers permissions](./lib/docs/Developers.png)

In this group, I’ve been giving the information and decided to give full access to EC2, read only to S3 and CloudWatch
logs as we always want to give Principle of Least Privilege. If ever unsure, always talk to the client/company to what
access is require. It’s always best to give lower access then upgrade later.

Operations:

    Full EC2, CloudWatch access
    Systems Manager access
    RDS management

![Operations permissions](./lib/docs/Operations.png)

Finance:

    Cost Explorer
    AWS Budgets
    Read-only resource access

![Finance permissions](./lib/docs/Finance.png)

Analysts:

    Read-only S3 access
    Read-only database access

![Analysts permissions](./lib/docs/Analyst.png)

Each of these follow the Principle of Least Privilege and can always be changed in accordance with the companies requirements.

## Conclusion

Security is of utmost importance and securing the main management account and giving everyone their own accounts with their own
permissions to the things they need to do their jobs is paramount for the security of the company.

The security choices I have made have been done with the mindset of Principle of Least Privilege with the information that has
been given. Doing this through the console is OK, but it is subject to more human error. Moving onward using CDK and Typescript
or Terraform would be a better approach and one i will be implementing.

## Implementation of IAM users and group with permissions via CDK Typescript

The first 2 file are, again, modular in design for the ease of maintenance and reuse ability. 
First is the group creation for the Developers. Again keeping everything modular instead of one big file. Keep it simple, keep it clean.  
Second file for the creation of users with it set up to force a reset of password on first login. Names can all be adjusted to suit.  

Have Added the separate permissions file, all connected and instantiated in the main app file in the bin directory.  

*** Updated code ***  
Have ironed out the bugs in circular dependencies and added random password generation for the initial user setups, then a force reset of
password on first login. Added new group with permissions that can be fine grained controlled with instructions from the client.  
Next will need to set up the same for all the other groups within the company.

