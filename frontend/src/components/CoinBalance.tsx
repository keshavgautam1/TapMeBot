import React from "react";

const CoinBalance = ({ balance }: { balance: number }) => {
  return (
    <div className="text-2xl font-bold text-gray-700 mb-4">
      Coins: {balance}
    </div>
  );
};

export default CoinBalance;
