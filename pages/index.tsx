import clientPromise from "@/lib/mongodb";
import { HomeScreen } from "@/src/screens";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getStaticProps: GetStaticProps<ConnectionStatus> = async () => {
  try {
    const client = await clientPromise;
    return {
      props: { isConnected: true },
      revalidate: 90,
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
      revalidate: 90,
    };
  }
};

export default function Home({
  isConnected,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomeScreen isConnected={isConnected} />;
}
