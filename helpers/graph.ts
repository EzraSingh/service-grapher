import { GraphData } from "react-d3-graph";

const toRadians = (d: number) => (d * Math.PI) / 180;

export function compileGraph(resources: ResourceType[]): GraphData<any, any> {
  if(resources.length === 0) return { nodes: [], links: [] };
  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;
  const SCALE = (HEIGHT ** 2 + WIDTH ** 2) * 0.0001;
  const [x0, y0] = [HEIGHT / 2, WIDTH / 2];
  const DISPLACEMENT = [SCALE, -toRadians(30)];
  function alongRadialPath(r: number, theta: number): [number, number] {
    const x = r * Math.cos(theta) + x0;
    const y = r * Math.sin(theta) + y0;
    return [x, y];
  }
  function displacePoint(
    r: number,
    theta: number,
    s: [number, number]
  ): [number, number] {
    const x = r * Math.cos(theta) + s[0];
    const y = r * Math.sin(theta) + s[1];
    return [x, y];
  }
  const [root] = resources.filter((r) => r.group === ResourceGroups.Org);
  const nodes = resources.reduce<{ id: string; fx?: number; fy?: number }[]>(
    (n, r, i) => {
      const [s, t0] = DISPLACEMENT;
      const offset = (i + (1 % (r.group + 1))) * 20; // ? a rolling index, scaled by some constant; since order dosnt mattter
      const position = alongRadialPath(s, r.group * t0); // ? general location
      const [fx, fy] =
        r.group !== ResourceGroups.Org
          ? displacePoint(offset, toRadians(offset * 3), position) // ? prevents overlapping nodes of same group
          : [x0, y0]; // ? Center only the root
      const mainNode = { id: r.key, fx, fy };
      const childrenNodes = r.relatedTo
        ? r.relatedTo.map<{ id: string; fx?: number; fy?: number }>(
            (ref: string, j) => {
              // ? displace children from parent
              const p = displacePoint(100, toRadians(j * 15), [fx, fy]);
              return { id: ref, fx: p[0], fy: p[1] };
            }
          )
        : [];
      return n.concat([mainNode, ...childrenNodes]);
    },
    []
  );
  const links = resources.reduce<{ source: string; target: string }[]>(
    (l, r, i) => {
      // ? All resources link to the root
      const linkToRoot = { source: root.key, target: r.key };
      const childLinks = r.relatedTo
        ? r.relatedTo.map<{ source: string; target: string }>((ref: string) => {
            return { source: ref, target: r.key };
          })
        : [];
      const parentLinks = r.dependsOn
        ? r.dependsOn.map<{ source: string; target: string }>((ref: string) => {
            return { source: r.key, target: ref };
          })
        : [];
      return l.concat([linkToRoot, ...childLinks, ...parentLinks]);
    },
    []
  );
  return {
    nodes,
    links,
    focusedNodeId: root.key
  };
}