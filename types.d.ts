import type { Property } from 'csstype';
import type { ResourceGroup } from './app/helpers/graph';

interface ResourceType {
  // ? for reference
  key: string;
  // ? determines scope and color of resource
  group: ResourceGroup;
  // ? draws arrow from related to resource
  relatedTo?: string[];
  // ? draws arrow from resource to dependent
  dependsOn?: string[];
}

  interface GraphConfig {
    org: string;
    palette?: {
      org?: Property.Color;
      stateless?: {
        data?: Property.Color;
        app?: Property.Color;
      };
      statefull?: {
        data?: Property.Color;
        app?: Property.Color;
      }
    }
    graph: ResourceType[];
  }