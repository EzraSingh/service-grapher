local sdk = import "lib/sdk.libsonnet";

sdk.Graph("liontechnyc", {
  freeswitch: sdk.Resource(
    "FreeSwitch",
    group=sdk.Group.Statefull.Application,
    depends=[self.mysql]
  ),
  mysql: sdk.Resource(
    "MySQL",
    group=sdk.Group.Statefull.DataSource
  ),
})
