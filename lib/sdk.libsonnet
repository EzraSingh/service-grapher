{
  Group: {
    Org: 0,
    Statefull: {
      Data: 1,
      App: 2,
    },
    Stateless: {
      Data: 3,
      App: 4,
    },
  },
  defaultPalette:: {
    org: 'black',
    statefull: {
      data: 'red',
      app: 'blue',
    },
    stateless: {
      data: 'green',
      app: 'purple',
    },
  },
  Resource(
    name=error 'resource name is required',
    group=error 'resource group is required',
    depends=[],
    related=[]
  ): {
    group: group,
    key: name,
    [if std.length(depends) > 0 then 'dependsOn']: [resource.key for resource in depends],
    [if std.length(related) > 0 then 'relatedTo']: [resource.key for resource in related],
  },
  Graph(
    org=error 'organization name is required',
    resources=error 'map of resources is required',
    palette=$.defaultPalette
  ): {
    org: org,
    palette: palette,
    graph: std.flattenArrays([
      [$.Resource(org, $.Group.Org)],
      std.objectValues(resources),
    ]),
  },
}
