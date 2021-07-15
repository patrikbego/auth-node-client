const sonarqubeScanner = require('sonarqube-scanner');
const envToExport = require('./config.local');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.sources': '.',
      'sonar.tests': '.',
      'sonar.inclusions': '**', // Entry point of your code
      'sonar.test.inclusions': 'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      // 'sonar.testExecutionReportPaths': 'coverage/test-reporter.xml',
      'sonar.projectKey': 'auth-node-client',
      'sonar.login': envToExport.sonar.clientID,
    },
  }, () => {
    console.log('process.env.SONAR_CLIENT_ID ===== ', process.env.SONAR_CLIENT_ID);
    console.log('process.env ===== ', process.env);
  },
);
