# Release Note of the VP Portal

This is a release note to inform you about current changes


## v1.5.0 - 28.02.2024

 </p>

### Login only via AAI
Login is now only via AAI ([Elixir Authentication and Authorisation Infrastructure](https://elixir-europe.org/platforms/compute/aai)) and the bypass via local Keycloak authentication as a temporary solution has been removed. </p>

### Technical Alignment with other VP components
Check out the adjustment of the resource types, due to changes in the [metadata schema](https://github.com/ejp-rd-vp/resource-metadata-schema). The changes are visible in the list of resources as well as in the filter criteria options.
Moreover, from this release onwards, older API specifications are no longer supported. Only resources with a compliant functioning [beacon v2 specification](https://github.com/ejp-rd-vp/vp-api-specs) can be interrogated via the VP portal. In addition, only resources with real data will be connected.</p>

### Design changes of the VP Portal
Discover the possibilities of the VP Portal with the help of the User Stories on the landing page and find out how you can use the portal for your research.

We are constantly working on improving the design and as part of this, minor changes have been made to the results display to allow better understanding of the outcomes. </p>

### Technical changes of the VP Portal
The stability of the VP Portal was improved through automated test implementation (JUnit tests as well as integration tests), which ensures correct functionality and to catch any regressions.
Additionally, a monitoring service has been developed to check resource availability. This functionality will be developed further to make it also visible in the VP Portal User Interface.


## v1.0.0 - 14.08.2023 </p>

**We are pleased to announce the first official release of the VP portal!**
