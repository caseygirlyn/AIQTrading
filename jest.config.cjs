module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "json", "node"],

  // Mock css files
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/utils/filemock.js'
  },
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // The test environment that will be used for testing
  // testEnvironment: "node",
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "<rootDir>/tests/**/*.js"
  ],
  
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/"],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testEnvironmentOptions: {
    "url": "http://localhost"
  },

  transformIgnorePatterns: [
    '/node_modules/',
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true
};

console.log('Jest config file executed');