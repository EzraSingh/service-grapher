{
  Group: {
    Org: 0,
    Statefull: {
      DataSource: 1,
      Application: 3,
    },
    Stateless: {
      DataSource: 2,
      Application: 4,
    },
  },
  Resource(
    name=error "resource name is required",
    group=error "resource group is required",
    depends=[],
    related=[]
  ): {
    group: group,
    key: name,
    [if std.length(depends) > 0 then "dependsOn"]: [resource.key for resource in depends],
    [if std.length(related) > 0 then "relatedTo"]: [resource.key for resource in related],
  },
  Graph(
    org=error "organization name is required",
    resources=error "map of resources is required"
  ): {
    graph: std.flattenArrays([
      [$.Resource(org, $.Group.Org)],
      std.objectValues(resources),
    ]),
  },
}
