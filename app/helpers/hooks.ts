import { useMemo } from "react";
import type { GraphConfiguration, GraphLink, GraphNode } from "react-d3-graph";

type D3GraphConfig = Partial<GraphConfiguration<GraphNode, GraphLink>>;

export function useGraph() {
    const config = useMemo<D3GraphConfig>(
      () => ({
        panAndZoom: true,
        automaticRearrangeAfterDropNode: true,
        nodeHighlightBehavior: true,
        directed: true,
        node: {
          size: 150,
          highlightStrokeColor: "blue",
          fontSize: 24
        },
        link: {
          highlightColor: "lightblue",
        },
        height: window.innerHeight,
        width: window.innerWidth,
        initialZoom: 250,
      }),
      []
    );
    const onClickNode = (nodeId: string) =>
      window.alert(`Clicked node ${nodeId}`);
    const onClickLink = (source: string, target: string) =>
      window.alert(`Clicked link between ${source} and ${target}`);
    return { config, onClickLink, onClickNode };
  }