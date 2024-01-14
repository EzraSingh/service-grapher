import type { Property } from 'csstype';
import type { GraphData, GraphLink, GraphNode } from "react-d3-graph";
import type { GraphConfig } from "@/types";

export type GraphSchema = GraphData<GraphNode, GraphLink>;

// ? see lib/sdk.libsonnet
export enum ResourceGroups {
  Org = 0,
  StatefullData = 1,
  StatefullApp = 2,
  StatelessData = 3,
  StatelessApp = 4,
}

const defaultPalette = {
  org: 'black',
    statefull: {
      data: 'red',
      app: 'blue',
    },
    stateless: {
      data: 'green',
      app: 'purple',
    },
}
 
const groupToSymbol: { [G in ResourceGroups]: string } = {
  [ResourceGroups.Org]: 'circle',
  [ResourceGroups.StatefullData]: 'triangle',
  [ResourceGroups.StatefullApp]: 'triangle',
  [ResourceGroups.StatelessData]: 'square',
  [ResourceGroups.StatelessApp]: 'square',
}

// ? determines color of node based on group
function computeColor(group: ResourceGroups, palette: Partial<GraphConfig['palette']> = defaultPalette): Property.Color {
  const groupToColor = {
    [ResourceGroups.Org]: palette.org ?? defaultPalette.org,
    [ResourceGroups.StatefullData]: palette.statefull?.data ?? defaultPalette.statefull.data,
    [ResourceGroups.StatefullApp]: palette.statefull?.app ?? defaultPalette.statefull.app,
    [ResourceGroups.StatelessData]: palette.stateless?.data ?? defaultPalette.stateless.data,
    [ResourceGroups.StatelessApp]: palette.stateless?.app ?? defaultPalette.stateless.app,
  };
  return groupToColor[group];
}

// ? uses DFS algorithm to produce suitable d3 graph config
export function compileGraph(config: GraphConfig): GraphSchema {
  const { org: root, graph: resources, palette = defaultPalette } = config;
  const graph: GraphSchema = { nodes: [], links: [] };
  for(const resource of resources){
    graph.nodes.push({ 
      id: resource.key, 
      color: computeColor(resource.group, palette),
      symbolType: groupToSymbol[resource.group as ResourceGroups]
    });
    // ? add links for dependencies
    if(resource.dependsOn){
      const deps = resource.dependsOn.map((target) => ({ source: resource.key, target }))
      graph.links.push(...deps);
    }
    // ? add links for relations
    if(resource.relatedTo){
      const rels = resource.relatedTo.map((source) => ({ source, target: resource.key }));
      graph.links.push(...rels);
    }
    // ? mark organization as the focused node
    if(resource.group == ResourceGroups.Org)
      graph.focusedNodeId = resource.key;
    // ? otherwise add default link to org 
    else
      graph.links.push({ source: resource.key, target: root });
  }
  return graph;
}