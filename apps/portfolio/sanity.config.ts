import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas/index";

export default defineConfig({
  name: "default",
  title: "Portfolio Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio", // Studio will be at /studio route
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});