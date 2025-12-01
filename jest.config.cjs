// jest.config.cjs
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",

  // IGNORA TESTE DO FOOTER E DOS PAGES
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/__tests__/components/Footer.test.tsx",
    "<rootDir>/src/__tests__/pages"
  ],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    // Mock ECharts
    "^echarts-for-react$": "<rootDir>/src/__mocks__/echarts-for-react.js",

    // Mock Next/Image
    "^next/image$": "<rootDir>/src/__mocks__/next-image.js"
  },

});
