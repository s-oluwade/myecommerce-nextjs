### 

This is a nextjs ecommerce application that was originally developed locally on a windows machine, powered by a mongodb database.

In this guide, I will show you how to deploy this application to AWS. In the process, we will utilize all AWS services at our disposal to produce a highly optimized and efficient application.

## Step 1: Migrate database from dynamodb to mongodb

    ## Export table from mongodb
    The first step is to export the database table from mongodb 
    To do this, we would need to download mongodb database tools from here.
    ```
        https://www.mongodb.com/try/download/database-tools
    ```

    

    Then, we can use  


## STEP 2: Migrate application from a windows machine to an ubuntu virtual machine (ec2 instance).

    ## Create an EC2 Instance with Ubuntu 

    ## Setup server with all neccesary installations
    We are going to need to install the following programs:
        
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

        aws configure

        sudo apt install python3

        python3 --version

        python3 mongo_to_dynamo_json.py

