pipelineJob('Frontend-build') {
  description('Build docker image, test and push it to local registry')
  label('jjb')
  triggers {
    scm('*/5 * * * *')
  }
  definition {
    cpsScm {
      scm {
        git('git@github.com:ClearPointNZ/connect-simple-todos-app.git') {
          node -> node / extensions()
        }
      }
      scriptPath('jobs/frontend/pipeline/Jenkinsfile')
    }
  }
}