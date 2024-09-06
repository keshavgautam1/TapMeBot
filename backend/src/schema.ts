import { makeExecutableSchema } from "@graphql-tools/schema";
import { SupabaseClient } from "@supabase/supabase-js";

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
    getUserBalance: async (
      _: any,
      { userId }: { userId: string },
      { supabase }: { supabase: SupabaseClient }
    ) => {
      const { data } = await supabase
        .from("users")
        .select("balance")
        .eq("id", userId)
        .single();
      return data?.balance || 0;
    },
  },
  Mutation: {
    tapButton: async (
      _: any,
      { userId }: { userId: string },
      { supabase }: { supabase: SupabaseClient }
    ) => {
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
export const schema = makeExecutableSchema({ typeDefs, resolvers });
