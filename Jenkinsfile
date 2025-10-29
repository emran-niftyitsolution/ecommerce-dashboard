pipeline {
    agent any
    tools { nodejs 'nodejs' }

    triggers { githubPush() }

    environment {
        APP_DIR  = '/home/nifty/ecommerce-dashboard'
        PM2_NAME = 'ecommerce-dashboard'
    }

    stages {
        stage('Deploy on Push') {
            when {
                branch 'main'
            }
            steps {
                dir(APP_DIR) {
                    sh '''
                        echo "Deploying $PM2_NAME from $BRANCH_NAME..."

                        git checkout $BRANCH_NAME
                        git pull origin $BRANCH_NAME

                        npm ci --only=production
                        npm run build

                        pm2 restart $PM2_NAME || pm2 start npm --name "$PM2_NAME" -- start

                        echo "Deployed!"
                    '''
                }
            }
        }
    }

    post {
        success { echo "$PM2_NAME updated & live!" }
        failure { echo "Deploy failed." }
    }
}