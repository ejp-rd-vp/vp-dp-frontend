# Release Note of the VP Portal

This is a release note to inform you about current changes

## V1.6.0 – 07.06.2024

  </p>

### Update AAI
Integration of the new LS AAI version 2 was established.

### Integration of VP Index
Previously, information on resources in the VP network was manually updated and maintained. With the integration of the VP Index, this information is now retrieved dynamically. As the VP network grows, new resources will automatically appear in the portal.

### Beacon query update
Prefixes are now supplied in the Beacon query.

### Connect Negotiator
Once relevant resources of interest are discovered, a data request can be submitted for further analysis. Within the BBMRI network, the Negotiator is already established for requesting data and biosamples from the biobanks. This integration allows users, after receiving a successful response from BBMRI, to be forwarded to the Negotiator with the result resources preselected.


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
