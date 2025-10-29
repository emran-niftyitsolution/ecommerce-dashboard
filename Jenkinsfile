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

        stage('Debug User') {
            steps {
                sh 'whoami'
            }
        }

        stage('Deploy on Push') {
            steps {
                dir(APP_DIR) {
                    sh '''
                        echo "Deploying $PM2_NAME from $BRANCH_NAME..."
                        
                        # Use fetch/reset for a clean, non-interactive update
                        git fetch origin
                        git reset --hard origin/$BRANCH_NAME 
                        
                        # 1. Install all dependencies for the build
                        npm ci 

                        # 2. Run the build (now devDependencies are available)
                        npm run build
                        
                        # 3. Prune dev dependencies before starting the app (optional, saves space)
                        npm prune --production
                        
                        # 4. Restart or Start the application
                        pm2 restart $PM2_NAME || pm2 start npm --name "$PM2_NAME" -- start

                        echo "Deployed!"
                    '''
                }
            }
        }
    }

    post {
        success { echo "$PM2_NAME updated & live!" }
        failure { echo "Deploy failed!" }
    }
}