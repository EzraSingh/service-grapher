import type { GetStaticProps, InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

const Graph = dynamic(
  () => import("@/components/Graph").then((mod) => mod.Graph),
  { ssr: false }
);

interface StaticProps {
  graph: ResourceType[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  //const manifestPath = `${process.cwd()}/manifest.jsonnet`;
  return { props: { graph: [] } };
};

export default function Home({
  graph,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="overflow-hidden">
      <Graph resources={graph} />
    </main>
  );
}
