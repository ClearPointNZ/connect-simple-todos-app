job('meta-jjb') {
  scm {
    git('git@github.com:ClearPointNZ/connect-simple-todos-app.git'){
      node -> node / extensions()
    }
  }
  triggers {
    scm('*/5 * * * *')
  }
  steps {
    dsl {
      external('jobs/**/*.groovy')
      removeAction('DELETE')
    }
  }
}