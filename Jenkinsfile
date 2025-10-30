pipeline {
    agent any
    tools { nodejs 'nodejs' }

    triggers { githubPush() }

    environment {
        APP_DIR  = '/home/nifty/ecommerce-dashboard'
        BRANCH_NAME = 'main'

        PATH = "/home/nifty/.bun/bin:/usr/local/bin:/usr/bin:/bin"
        PM2_HOME = '/home/nifty/.pm2'
        PM2_NAME = 'ecommerce-dashboard'
        PORT = 3001
    }

    stages {
        stage('Deploy on Push') {
            steps {
                    sh '''
                        cd $APP_DIR
                        git pull origin $BRANCH_NAME
                        
                        bun install --production
                        bun run build

                        pm2 restart ${PM2_NAME} || \
                        pm2 start bun --name "${PM2_NAME}" -- run start -- --port ${PORT}

                        echo "Deployed Successfully!"
                    '''
            }
        }
    }

    post {
        success { echo "$PM2_NAME updated & live!" }
        failure { echo "Deploy Failed!" }
    }
}