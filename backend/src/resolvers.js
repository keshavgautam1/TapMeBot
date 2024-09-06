"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = resolvers;
