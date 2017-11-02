const fs = require('fs');
const CodeGen = require('swagger-typescript-codegen').CodeGen;

const file = '../swagger.json';
const swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));

const tsSourceCode = CodeGen.getCustomCode({
  moduleName: 'TodoApi',
  className: 'TodoApi',
  swagger: swagger,
  lint: false,
  template: {
    class: fs.readFileSync(
      'scripts/templates/typescript-class.mustache',
      'utf-8'
    ),
    method: '',
    type: fs.readFileSync('scripts/templates/type.mustache', 'utf-8'),
  },
});

fs.writeFileSync('app/generated-interface.ts', tsSourceCode);
