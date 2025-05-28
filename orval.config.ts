import { defineConfig } from "orval";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  api: {
    input: {
      target: `${process.env.API_URL}/swagger-json`,
    },
    output: {
      mode: "single",
      target: "./src/gen/api.ts",
      schemas: "./src/gen/types",
      client: "react-query",
      baseUrl: `${process.env.API_URL}/`,
      override: {
        mutator: {
          path: "./app/services/api.ts",
          name: "http",
        },
      },
    },
  },
  apizod: {
    input: {
      target: `${process.env.API_URL}/swagger-json`,
    },
    output: {
      client: "zod",
      mode: "single",
      target: "./src/gen/api.zod.ts",
    },
  },
});
