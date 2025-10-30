pipeline {
    agent any
    tools { nodejs 'nodejs' }

    triggers { githubPush() }

    environment {
        APP_DIR  = '/home/nifty/ecommerce-dashboard'
        BRANCH_NAME = 'main'

        PM2 = "/usr/bin/pm2"
        PM2_NAME = 'ecommerce-dashboard'
    }

    stages {
        stage('Deploy on Push') {
            steps {
                    sh '''
                        cd $APP_DIR
                        git pull origin $BRANCH_NAME
                        npm i --only=production
                        npm run build
                        ${PM2} restart ${PM2_NAME} || ${PM2} start npm --name "${PM2_NAME}" -- run start

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