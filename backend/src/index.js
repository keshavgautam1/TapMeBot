"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const supabase_js_1 = require("@supabase/supabase-js");
const schema_1 = require("./schema");
const http_1 = require("http");
const dotenv = __importStar(require("dotenv"));
// Load environment variables
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key must be provided.");
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Create a Yoga instance
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: schema_1.schema,
    context: { supabase },
    graphqlEndpoint: "/graphql", // Set the GraphQL endpoint here
    landingPage: false, // Disable the default landing page
});
// Create and start the HTTP server
const server = (0, http_1.createServer)(yoga);
server.listen(4000, () => {
    console.log("GraphQL Server running on http://localhost:4000/graphql");
});
//npx ts-node src/index.ts
