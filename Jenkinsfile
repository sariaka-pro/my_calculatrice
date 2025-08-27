pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${env.PATH}"
    }

    stages {
        stage('Check Docker') {
            steps {
                sh 'docker --version'
                sh 'which docker'
            }
        }

        stage('Cloner le Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sariaka-pro/my_calculatrice'
            }
        }

        stage('Construire et Tester l\'Image Docker') {
            steps {
                script {
                    // Construire l'image Docker
                    sh "docker build --no-cache -t calculatrice:${env.BUILD_ID} ."

                    // Lancer le container pour exécuter les tests
                    sh "docker run --rm calculatrice:${env.BUILD_ID}"
                }
            }
        }

        stage('Déployer en Production') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                input message: 'Les tests ont réussi. Voulez-vous déployer en production ?', ok: 'Déployer'
                script {
                    // Supprimer un ancien container prod s’il existe
                    sh 'docker rm -f calculatrice-prod || true'

                    // Lancer l’appli en prod (pas les tests, juste le serveur statique)
                    sh "docker run -d -p 8081:8080 --name calculatrice-prod calculatrice:${env.BUILD_ID} npx http-server -p 8080"
                } 
            }
        }
    }
}