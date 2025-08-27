pipeline {
    agent any

    stages {
        stage('Cloner le code') {
            steps {
                // On clone le repo Github
                git branch: 'main', 
                    url: 'https://github.com/sariaka-pro/my_calculatrice.git'
            }
        }

        stage('Construire et tester') {
            steps {
                // Construire avec Maven
                sh 'mvn clean install'

                // Lancer le serveur statique puis exécuter le test Selenium
                sh 'npx http-server ./ &'
                sh 'node test_calculatrice.js'
            }
        }

        stage('Déployer en production') {   // Définition du stage "Déployer en production"
            steps {                         // Étapes de ce stage
                script {                    // On passe en mode script (nécessaire pour mettre du code Groovy/if)
            
                // On demande une confirmation manuelle à l'utilisateur avant de déployer
                def deploy = input(
                id: 'DeployConfirmation',  // Identifiant interne du formulaire
                message: 'Voulez-vous déployer en production ?', // Message affiché dans Jenkins
                parameters: [
                    // L'utilisateur doit choisir entre Oui et Non
                    choice(name: 'confirme', choices: ['Non', 'Oui'], description: 'Choisir Oui pour déployer')
                ]
            )

            // Si l'utilisateur clique sur "Oui"
                if (deploy == 'Oui') {
                echo "Déploiement validé"  // Affiche un message dans la console Jenkins

            
            // Si l'utilisateur clique sur "Non"
                } else {
                echo "Déploiement annulé"      // Affiche un message dans la console
                currentBuild.result = 'ABORTED'   // Marque le build comme annulé
                error("Déploiement non validé")   // Stoppe le pipeline avec une erreur
            }
        }
    }
}
}
}
