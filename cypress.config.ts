import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  experimentalStudio: true,
  viewportWidth: 1920,
  viewportHeight: 1080,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
