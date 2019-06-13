# Philosophy
* Reusable components seat under libs.
* Deployable apps seat under apps.
* Currently it is on the base one app per microsite.
* Apps should mostly be basic wrappers which style and aggregate the components in a coherent routable app.

# Rules
* Components in libs should not use any router feature.
* Components in libs should instead trigger events, that should be caught by the parent app to update the routing if necessary.
