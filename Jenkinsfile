pipeline {
    agent any
    tools { nodejs 'nodejs' } // Optional: bun doesn't need Node.js tools
    triggers { githubPush() }

    environment {
        APP_DIR     = '/home/nifty/ecommerce-dashboard'
        PM2_NAME    = 'ecommerce-dashboard'
        BRANCH_NAME = 'main'
    }

    stages {
        stage('Deploy with Bun') {
            steps {
                dir(APP_DIR) {
                    sh '''
                        echo "Deploying $PM2_NAME from $BRANCH_NAME using Bun..."

                        # Pull latest code
                        git pull origin $BRANCH_NAME

                        # Use Bun to install & build
                        bun install --frozen-lockfile
                        bun run build

                        # Restart with PM2
                        pm2 restart $PM2_NAME || pm2 start bun --name "$PM2_NAME" -- run start

                        echo "Deployed with Bun!"
                    '''
                }
            }
        }
    }

    post {
        success { echo "$PM2_NAME updated & live with Bun!" }
        failure { echo "Bun deploy failed!" }
    }
}