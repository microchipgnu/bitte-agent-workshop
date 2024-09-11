import type { ReferenceConfiguration } from "@scalar/api-reference";
import { ApiReference } from "@scalar/nextjs-api-reference";
import { DEPLOYMENT_URL } from "vercel-url";

const config: ReferenceConfiguration = {
  spec: {
    url: "/.well-known/ai-plugin.json",
  },
  theme: "purple",
  servers: [
    {
      // Override server URLs using Vercel system env variables
      // Defaults to http://localhost:3000 on local development
      url: DEPLOYMENT_URL,
    },
  ],
};

export const GET = ApiReference(config);
