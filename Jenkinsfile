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
        stage('Deploy on Push') {
            steps {
                    sh '''
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