"use client";
import { useMemo } from "react";
import { Graph as D3Graph, GraphConfiguration } from "react-d3-graph";
import { compileGraph } from "@/helpers/graph";

export interface GraphProps {
  resources: ResourceType[];
}

export const Graph: React.FC<GraphProps> = ({ resources }) => {
  const config = useMemo<Partial<GraphConfiguration<any, any>>>(
    () => ({
      panAndZoom: true,
      automaticRearrangeAfterDropNode: true,
      nodeHighlightBehavior: true,
      directed: true,
      node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
        //viewGenerator: (n) => <Node node={n}/>
      },
      link: {
        highlightColor: "lightblue",
      },
      height: window.innerHeight,
      width: window.innerWidth,
    }),
    []
  );
  const onClickNode = (nodeId: string) =>
    window.alert(`Clicked node ${nodeId}`);
  const onClickLink = (source: string, target: string) =>
    window.alert(`Clicked link between ${source} and ${target}`);
  const data = useMemo(() => compileGraph(resources), [resources]);
  return <D3Graph id="graph" {...{ data, config, onClickNode, onClickLink }} />;
};
