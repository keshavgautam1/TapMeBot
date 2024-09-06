import React from "react";

const TapButton = ({
  onTap,
  disabled,
}: {
  onTap: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className={`p-6 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-700 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onTap}
      disabled={disabled} // Button disabled while mutation is in progress
    >
      {disabled ? "Tapping..." : "Tap Me!"}
    </button>
  );
};

export default TapButton;
