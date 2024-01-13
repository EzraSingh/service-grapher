import type { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";
import process from "process";
import Jsonnet from "jsonnet";

const Graph = dynamic(
  () => import("@/components/Graph").then((mod) => mod.Graph),
  { ssr: false }
);

interface StaticProps {
  graph: ResourceType[];
  result: any;
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const manifestPath = `${process.cwd()}/manifest.jsonnet`;
  const jsonnet = new Jsonnet();
  const result = jsonnet.evalFile(manifestPath);
  console.log({ result });
  return { props: { graph: [], result } };
};

export default function Home({
  graph,
  result,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="overflow-hidden">
      <Graph resources={graph} />
    </main>
  );
}
