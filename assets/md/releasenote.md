# Release Note of the VP Portal

This is a release note to inform you about current changes
## v1.5.0

### Login with AAI
- Logging now directly via AAI, bypassing keycloak authentication.

### Alignment with updated VP components
- Beacon API
- Metadata schema 

### VP Portal frontend
- Flashcards: Access to flashcards in EJP Landing Page.
- Results list redesign: The results list has been redesigned to make it easier for non-specialist users to understand. It now separates resource level results from record level results.

### VP Portal backend: Monitoring Feature + Test
- Monitoring Service Backend: A monitoring service has been added to check resource availability.
- Test implementation: We've implemented unit and integration tests for the Notification Service, Resource Service, Mapping Service and Monitoring Service to ensure correct functionality and to catch any regressions.

