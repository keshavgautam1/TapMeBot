"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
// Define type definitions
const typeDefs = `
  type Query {
    getUserBalance(userId: String!): Int
  }
  
  type Mutation {
    tapButton(userId: String!): Int
  }
`;
// Define resolvers
const resolvers = {
    Query: {
        getUserBalance: async (_, { userId }, { supabase }) => {
            const { data } = await supabase
                .from("users")
                .select("balance")
                .eq("id", userId)
                .single();
            return data?.balance || 0;
        },
    },
    Mutation: {
        tapButton: async (_, { userId }, { supabase }) => {
            const { data } = await supabase
                .from("users")
                .select("balance")
                .eq("id", userId)
                .single();
            const newBalance = (data?.balance || 0) + 1;
            await supabase
                .from("users")
                .update({ balance: newBalance })
                .eq("id", userId);
            return newBalance;
        },
    },
};
// Create and export the schema
exports.schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
