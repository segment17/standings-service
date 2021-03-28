const { Given, When, Then, Before } = require('@cucumber/cucumber');
const TestFunctions = require('../../test/TestFunctions');
const ScenarioTesterFactory = require('../../test/ScenarioTesters/ScenarioTesterFactory');
const globalObjects = require('../../index');

Before(async function (scenario) {
  globalObjects.done = false;
  globalObjects.setScenarioTester(ScenarioTesterFactory.createScenarioTester(scenario));
  globalObjects.scenarioTester.before();
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

Given('{string} is running', function (serviceName) {
  globalObjects.scenarioTester.serviceIsRunning(serviceName);
});

Given('there is a boxer such as {string}', async function (boxerDataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsABoxerSuchAs(boxerDataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});

Given('there are boxers such as {string}', async function (boxersDataSource) {
  /* globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsABoxerSuchAs(boxerDataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  } */
});

When('{string} is called with {string}', function (endpoint, requestBodySource) {
  globalObjects.scenarioTester.endpointIsCalledWithRequestBody(endpoint, requestBodySource);
});

When('{string} is called', function (endpoint) {
  globalObjects.scenarioTester.endpointIsCalled(endpoint);
});

Then('response is as {string}', async function (expectedResponse) {
  await globalObjects.scenarioTester.responseIsAs(expectedResponse);
});

Given('there are matches such as {string}', function (matchesDataSource) {
  globalObjects.scenarioTester.thereAreMatchesSuchAs(matchesDataSource);
});

Given('there is a standing such as {string}', function (standingDataSource) {
  //globalObjects.scenarioTester.thereIsAStandingSuchAs(standingDataSource);
});

Given('there are standings such as {string}', function (standingsDataSource) {
  //globalObjects.scenarioTester.thereAreStandingsSuchAs(standingsDataSource);
});

When('{string} is invoked with {string}', function (unitFunctionName, invocationDataSource) {
  globalObjects.scenarioTester.unitFunctionIsInvokedWithData(unitFunctionName, invocationDataSource);
});

When('{string} is invoked', function (unitFunctionName) {
  globalObjects.scenarioTester.unitFunctionIsInvokedWithData(unitFunctionName, null);
});

Then('returned data is as {string}', async function (expectedDataSource) {
  await globalObjects.scenarioTester.returnedDataIsAs(expectedDataSource);
});

Given('there is a standing with matches such as {string}', async function (dataSource) {
  globalObjects.done = false;
  await globalObjects.scenarioTester.thereIsAStandingAndMatchesSuchAs(dataSource);
  while (!globalObjects.done) {
    await TestFunctions.sleep(100);
  }
});