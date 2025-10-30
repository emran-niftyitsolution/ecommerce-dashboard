pipeline {
    agent any
    tools { nodejs 'nodejs' }

    triggers { githubPush() }

    environment {
        APP_DIR  = '/home/nifty/ecommerce-dashboard'
        PM2_NAME = 'ecommerce-dashboard'
        BRANCH_NAME = 'main'
    }

    stages {

        // stage('Fix Git Safety Error') {
        //     steps {
        //         sh 'git config --global --add safe.directory /home/nifty/ecommerce-dashboard'
        //     }
        // }

        stage('Deploy on Push') {
            steps {
                    sh '''
                        echo "Deploying $PM2_NAME from $BRANCH_NAME..."

                        echo "Current directory: $(pwd)"
                        cd $APP_DIR

                        git pull origin $BRANCH_NAME

                        npm i --only=production
                        npm run build

                        pm2 restart $PM2_NAME || pm2 start npm --name "$PM2_NAME" -- start

                        echo "Deployed!"
                    '''
            }
        }
    }

    post {
        success { echo "$PM2_NAME updated & live!" }
        failure { echo "Deploy failed!" }
    }
}