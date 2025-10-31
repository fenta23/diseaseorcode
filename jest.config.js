module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    teardown: 'after-env'
  }
};
