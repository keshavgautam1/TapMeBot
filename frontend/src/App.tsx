import React from "react";
import TapButton from "./components/TapButton";
import CoinBalance from "./components/CoinBalance";
import { gql, useMutation, useQuery } from "@apollo/client";

// GraphQL queries and mutations
const GET_BALANCE = gql`
  query GetBalance($userId: String!) {
    getUserBalance(userId: $userId)
  }
`;

const TAP_BUTTON = gql`
  mutation TapButton($userId: String!) {
    tapButton(userId: $userId)
  }
`;

const App = () => {
  const userId = "@TapTapMeMeBot"; // Placeholder: Replace with dynamic user ID
  const { data, loading, error, refetch } = useQuery(GET_BALANCE, {
    variables: { userId },
  });
  const [tapButton, { loading: tapLoading }] = useMutation(TAP_BUTTON);

  const handleTap = async () => {
    try {
      await tapButton({ variables: { userId } });
      refetch(); // Refetch the balance after the mutation
    } catch (err) {
      console.error("Error tapping button:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <CoinBalance balance={data?.getUserBalance || 0} />
      <TapButton onTap={handleTap} disabled={tapLoading} />
    </div>
  );
};

export default App;
