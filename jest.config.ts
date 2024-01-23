
  import type {Config} from 'jest';

  const config: Config = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.vue$': '@vue/vue3-jest',
      "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
    },
    moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  };
  
  export default config;