pipeline {
    agent any

    environment {
        GITHUB_CRED = credentials('c9985013-0d27-43e8-b35b-bb5c32f00431')   
        EC2_SSH = credentials('86302b1b-0243-4646-a4ab-c894358fdcf8')        
        DOCKERHUB_CRED = credentials('e6e972e4-11d3-4f2b-aab8-4032cce19aa1') 
        EC2_USER = "ubuntu"
        EC2_HOST = "3.110.188.30"
        APP_NAME = "portfolio"
        DOCKER_IMAGE = "gauravlomash77/portfolio:latest"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/gauravlomash77/Elevatelabsecondtask.git',
                    credentialsId: 'c9985013-0d27-43e8-b35b-bb5c32f00431'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (fileExists('test/test.js')) {
                        echo 'Installing Node.js dependencies...'
                        sh 'npm ci'
                        echo 'Running Node.js tests...'
                        sh 'npm test'  
                    } else {
                        echo 'Test file not found, skipping tests.'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Logging into DockerHub...'
                sh """
                echo $DOCKERHUB_CRED_PSW | docker login -u $DOCKERHUB_CRED_USR --password-stdin
                """
                echo 'Building Docker image...'
                sh "docker build -t $DOCKER_IMAGE ."
                echo 'Pushing Docker image to DockerHub...'
                sh "docker push $DOCKER_IMAGE"
            }
        }

        stage('Deploy on EC2') {
            steps {
                script {
                    echo "Deploying $APP_NAME on EC2..."
                    sh """
                    ssh -o StrictHostKeyChecking=no -i $EC2_SSH $EC2_USER@$EC2_HOST '
                        docker pull $DOCKER_IMAGE
                        docker stop $APP_NAME || true
                        docker rm $APP_NAME || true
                        docker run -d --name $APP_NAME -p 80:3000 $DOCKER_IMAGE
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
