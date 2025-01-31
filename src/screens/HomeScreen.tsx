import React, { ReactNode } from "react";
import { Connected, Examples, Header } from "../components";

export const HomeScreen = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <Header />
      <Connected isConnected={isConnected} />
      <Examples />
    </div>
  );
};
