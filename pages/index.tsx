import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { GraphConfig } from "@/types";
import dynamic from "next/dynamic";
import { GraphSchema, compileGraph } from "@/app/helpers/graph";

import "@/app/globals.css";
import config from "../graph.json";

// ? see lib/sdk.libsonnet
export enum ResourceGroup {
  Org = 0,
  StatefullData = 1,
  StatefullApp = 2,
  StatelessData = 3,
  StatelessApp = 4,
}

const Graph = dynamic(
  () => import("@/app/components/Graph").then((mod) => mod.Graph),
  { ssr: false }
);

interface StaticProps {
  graph: GraphSchema;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  return { props: { graph: compileGraph(config as GraphConfig) } };
};

export default function Home({
  graph,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="max-h-screen max-w-screen">
      <Graph data={graph} />
    </main>
  );
}
