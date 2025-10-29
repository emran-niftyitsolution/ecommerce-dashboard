pipeline {
    agent any
    tools { nodejs 'nodejs' }

    triggers { githubPush() }  // Auto-trigger on push

    environment {
        APP_DIR  = '/home/nifty/ecommerce-dashboard'
        PM2_NAME = 'ecommerce-dashboard'
        BRANCH   = 'main'
    }

    stages {
        stage('Deploy on Push') {
            when { branch BRANCH }  // Only run on main
            steps {
                dir(APP_DIR) {
                    sh '''
                        echo "Deploying $PM2_NAME from $BRANCH..."

                        git pull origin $BRANCH

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