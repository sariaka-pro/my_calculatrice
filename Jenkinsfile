pipeline {
    agent any

    stages {
        stage('Cloner le Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sariaka-pro/my_calculatrice.git'
            }
        }

        stage('Construire et Tester l\'Image Docker') {
            steps {
                script {
                    // Construire l'image
                    sh "docker build --no-cache -t calculatrice_app:${env.BUILD_ID} ."

                    // Lancer le container → il démarre http-server + exécute test_calculatrice.js
                    sh "docker run --rm calculatrice_app:${env.BUILD_ID}"
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
                    sh "docker run -d -p 8081:8080 --name calculatrice_app-prod calculatrice_app:${env.BUILD_ID} npx http-server -p 8080"
                } 
            }
        }
    }
}