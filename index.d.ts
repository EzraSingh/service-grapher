interface ResourceType {
    // ? reference identifier
    key: string;
    // ? postions into same general location
    group: number;
    // ? draws arrow from related to node
    relatedTo?: string[];
    // ? draws arrow from node to dependent
    dependsOn?: string[];
  }
  
enum ResourceGroups {
    Org = 0,
    StatefullData = 1,
    StatelessData = 2,
    StatefullApp = 3,
    StatelessApp = 4,
  }