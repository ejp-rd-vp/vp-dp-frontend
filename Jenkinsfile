pipeline {
  agent any
  stages {
    stage('Docker build') {
		steps {
                script {
                    sh "docker build . --file docker/Dockerfile --tag ${env.EJP_GUI_DEV_IMAGE_TAG}"
                }
            }
  }
	stage('Docker push') {
		steps {
			steps {
                script {
                    withDockerRegistry([credentialsId: 'nexus-credentials']) {
                        sh "docker push ${env.EJP_GUI_DEV_IMAGE_TAG}"
                    }
                }
            }
		}
    }
  }
}
