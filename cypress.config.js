const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const { allureCypress } = require("allure-cypress/reporter");

async function setupNodeEvents(on, config) {

  allureCypress(on, config, {
    resultsDir: "allure-results",
  });
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })

  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
module.exports = defineConfig({
  allowCypressEnv: true,

  pageLoadTimeout: 70000,
  defaultCommandTimeout: 30000,


  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents,
    env: {
      baseurl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
      baseurl2:'https://example.cypress.io/commands/actions'
    }
  },
});
