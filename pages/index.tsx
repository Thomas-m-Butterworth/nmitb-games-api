import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect();
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        (No) Money in the Bank: Games API
      </h1>

      <div className="flex items-center gap-2 mb-8">
        <div
          className={`w-4 h-4 rounded-full ${
            isConnected ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <p className="text-lg text-gray-700">
          {isConnected
            ? "Connected to NMitB Games Database"
            : "Not connected to NMitB Games Database."}
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          API Examples
        </h2>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-800">Fetch All Games</h3>
          <p className="text-sm text-gray-600 mb-2">
            Retrieve all games from the database.
          </p>
          <a
            href="/api/games"
            className="text-blue-500 hover:text-blue-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GET /api/games
          </a>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800">
            Fetch Individual Game
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Retrieve a specific game by its name (e.g., bingo).
          </p>
          <a
            href="/api/games/bingo"
            className="text-blue-500 hover:text-blue-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GET /api/games/bingo
          </a>
        </div>
      </div>
    </div>
  );
}
