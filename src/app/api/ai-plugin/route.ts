import { NextResponse } from "next/server";
import bitteDevJson from "@/bitte.dev.json";
import { DEPLOYMENT_URL } from "vercel-url";

export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "Simple Weather API",
      description: "API for retrieving basic weather information for a given city.",
      version: "1.0.0",
    },
    servers: [
      {
        url: bitteDevJson.url || DEPLOYMENT_URL,
      },
    ],
    "x-mb": {
      "account-id": "markeljan.near",
      assistant: {
        name: "Weather Informer",
        description: "An assistant that provides weather information",
        instructions: "Get weather information for a given city and ALWAYS generate an image if successful retrieval from the API. If not, ask the user to claim a token.",
        "tools": [{ type: "generate-image" }]
      },
    },
    paths: {
      "/api/weather": {
        get: {
          tags: ["Weather"],
          summary: "Get weather information",
          description: "This endpoint returns basic weather information for a specified city.",
          operationId: "get-weather",
          parameters: [
            {
              name: "city",
              in: "query",
              description: "The name of the city to get weather information for.",
              required: true,
              schema: {
                type: "string",
              },
              example: "London",
            },
          ],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      city: {
                        type: "string",
                      },
                      temperature: {
                        type: "number",
                      },
                      description: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}