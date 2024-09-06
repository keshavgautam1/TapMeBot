import { createYoga } from "graphql-yoga";
import { createClient } from "@supabase/supabase-js";
import { schema } from "./schema";
import { createServer } from "http";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Create a Yoga instance
const yoga = createYoga({
  schema,
  context: { supabase },
  graphqlEndpoint: "/graphql", // Set the GraphQL endpoint here
  landingPage: false, // Disable the default landing page
});

// Create and start the HTTP server
const server = createServer(yoga);

server.listen(4000, () => {
  console.log("GraphQL Server running on http://localhost:4000/graphql");
});

//npx ts-node src/index.ts
