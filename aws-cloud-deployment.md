### 

This is a nextjs ecommerce application that was originally developed locally on a windows machine, powered by a mongodb database.

In this guide, I will show you how to deploy this application to AWS. In the process, we will utilize all AWS services at our disposal to produce a highly optimized and efficient application.




## STEP 1: Migrate application from a windows machine to an ubuntu virtual machine (ec2 instance).

### Create an EC2 Instance with Ubuntu 

We can create an Ubuntu server either in a default VPC or a custom VPC. I prefer using a custom VPC whenever possible but I chose to create the instance in the default VPC here because of an issue I had while trying to create the DocumentDB instance.

- Select an ubuntu version that is less than your server version for compatibility. 

## Setup server with all neccesary installations
    We are going to need to install the following programs:
    ```    
        #!/bin/bash
        
        sudo apt update

        sudo apt install git -y
        git clone https://github.com/s-oluwade/myecommerce-nextjs.git
                
        # install node and npm
        sudo apt install nodejs
        node -v
        sudo apt install npm

        # install node dependencies
        npm install

        sudo apt install unzip

        # install aws cli
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
    ```

    After installing AWS CLI, Run 
        ```aws configure``` 
    and complete the prompt providing the access token, secret access token, region and filetype. 
    For the access token and secret access token, go to "security credentials" > "access keys" > "create access key", and copy the generated tokens. 
    For my region I chose "us-east-1", the region that I'm working in.

    
    
## Step 2: Migrate database from MongoDB to DocumentDB

### Dump Database Table (collection) from MongoDB 
        
    The first step is to export the database table from MongoDB 
    To do this, we would need to download MongoDB database tools from here.
    ```
        https://www.mongodb.com/try/download/database-tools
    ```

    ![mongo cli download image caption](https://github.com/s-oluwade/myecommerce-nextjs/blob/master/public/blog_images/mongo-cli-tools-download.png)

    Once you've ssh'd into your ubuntu server, run the following command to download mongo cli tools:

    `wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-100.9.5.tgz`

    We would need tar to uncompress so run: 
        
        ```
            sudo apt update
            sudo apt install tar
        ```
    
    The decompress using:
    ```
        tar -xvzf mongodb-database-tools-ubuntu2204-x86_64-100.9.5.tgz
        mv mongodb-database-tools-ubuntu2204-x86_64-100.9.5 mongodb-database-tools
        cd mongodb-database-tools/bin
    ```

    Now we can dump our mongodb collection using:
    ```
        ./mongodump --uri="mongodb+srv://<username>:<password>@<cluster-id>.iovys.mongodb.net/ecommerce" --collection=products --out=mongo_out
    ```

    Download Amazon DocumentDB Certificate Authority certificate required to authenticate to your DocumentDB cluster.
    ```
        wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem
    ```
    
    And then restore collection to documentdb using:
    ```
        ./mongorestore --ssl --host your-docdb-cluster.endpoint.amazonaws.com:27017 --sslCAFile global-bundle.pem --username <username> --password <password> --db ecommerce --collection products mongo_out/ecommerce/products.bson
    ```

# Errors
## Error Number 1
- error PrismaClientInitializationError: 
Invalid `prisma.product.count()` invocation:


Raw query failed. Code: `unknown`. Message: `Server selection timeout: No available servers. Topology: { Type: ReplicaSetNoPrimary, Servers: [ { Address: docdb-2024-06-22-18-10-56.cluster-cb0ioc4y41ca.us-east-1.docdb.amazonaws.com:27017, Type: Unknown, Error: No such file or directory (os error 2) }, ] }`
    at async Home (page.tsx:32:26)
- error PrismaClientInitializationError: 
Invalid `prisma.product.count()` invocation:


Raw query failed. Code: `unknown`. Message: `Server selection timeout: No available servers. Topology: { Type: ReplicaSetNoPrimary, Servers: [ { Address: docdb-2024-06-22-18-10-56.cluster-cb0ioc4y41ca.us-east-1.docdb.amazonaws.com:27017, Type: Unknown, Error: No such file or directory (os error 2) }, ] }`
    at async Home (page.tsx:32:26)
- error PrismaClientInitializationError: 
Invalid `prisma.product.count()` invocation:


Raw query failed. Code: `unknown`. Message: `Server selection timeout: No available servers. Topology: { Type: ReplicaSetNoPrimary, Servers: [ { Address: docdb-2024-06-22-18-10-56.cluster-cb0ioc4y41ca.us-east-1.docdb.amazonaws.com:27017, Type: Unknown, Error: No such file or directory (os error 2) }, ] }`
    at async Home (page.tsx:32:26)
digest: "1780671499"