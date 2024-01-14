"use client";
import type { GraphSchema } from "@/app/helpers/graph";
import { Graph as D3Graph } from "react-d3-graph";
import { useGraph } from "@/app/helpers/hooks";

export interface GraphProps {
  data: GraphSchema;
}

export const Graph: React.FC<GraphProps> = ({ data }) => {
  const { config, onClickNode, onClickLink } = useGraph();
  return <D3Graph id="graph" {...{ data, config, onClickNode, onClickLink }} />;
};
