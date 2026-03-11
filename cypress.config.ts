import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  experimentalStudio: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
