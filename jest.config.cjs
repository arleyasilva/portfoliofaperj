// jest.config.cjs
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    // 👇 ADICIONE ESTA LINHA (ESSENCIAL)
    "^echarts-for-react$": "<rootDir>/src/__mocks__/echarts-for-react.js"
  },

  testMatch: [
    "<rootDir>/src/__tests__/**/*.(test|spec).[jt]s?(x)",
    "<rootDir>/src/**/*.(test|spec).[jt]s?(x)",
  ],
};

module.exports = createJestConfig(customJestConfig);
