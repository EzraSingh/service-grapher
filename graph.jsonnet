local sdk = import 'lib/sdk.libsonnet';
local Group = sdk.Group;

sdk.Graph(
  org='liontechnyc',
  resources={

    proxy: sdk.Resource(
      'Reverse Proxy',
      group=Group.Stateless.App,
    ),

    cdn: sdk.Resource(
      'Content Delivery Network',
      group=Group.Stateless.Data
    ),

    landing: sdk.Resource(
      'Landing Site',
      group=Group.Stateless.App,
      depends=[self.proxy, self.courier],
      related=[self.cdn]
    ),

    app: sdk.Resource(
      'Web App',
      group=Group.Stateless.App,
      depends=[self.proxy, self.db, self.courier],
      related=[self.cdn]
    ),

    api: sdk.Resource(
      'Socket API Cluster',
      group=Group.Statefull.App,
      depends=[self.cache, self.db],
      related=[self.app]
    ),

    db: sdk.Resource(
      'Database',
      group=Group.Statefull.Data,
      depends=[self.proxy]
    ),

    cache: sdk.Resource(
      'Cache',
      group=Group.Stateless.Data,
      depends=[self.proxy]
    ),

    courier: sdk.Resource(
      'Email Courier',
      group=Group.Stateless.App,
    ),


  }
)
