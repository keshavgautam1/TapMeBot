import { SupabaseClient } from "@supabase/supabase-js";

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

export default resolvers;
