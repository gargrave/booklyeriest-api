# Booklyeriest API

Major WIP for building a new [JSON:API](https://jsonapi.org/format/) compliant
API for [Booklyeriest](https://github.com/gargrave/booklyeriest).

I have no intentions for this API to ever be production-ready, but if you're
dying to run it locally, these steps should get you roughly in the right
neighborhood (bear in mind, I am writing these steps from memory, so they may
not be 100% correct):

- Clone the repo and run `yarn`
- Prepare the DB
  - `docker-compose up -d`
  - `yarn migration:run`
- Run the API
  - `yarn dev`
  - This will launch the API at `localhost:8080`

## JSON:API Compatibility

Aside from building the API itself, a big part of this project is building my
own JSON:API wrapper for the NestJS framework. This is an ongoing project, and
it will undoubtedly be a while before I have full compliance (if ever).

### What is done

- Basic handling for all GET/POST/PATCH/DELETE requests
  - GET
    - Fetch all of a given resource via `/{resources}`
    - Fetch one of a given resource via `/{resources}/{id}`
  - POST
    - Creating a new resource via `/{resources}`
  - PATCH
    - Updating an existing resource via `/{resources}/{id}`
  - DELETE
    - Deleting an existing resource via `/{resources}/{id}`
- Handling
  [sparse fieldsets](https://jsonapi.org/format/#fetching-sparse-fieldsets) via
  the `fields` query param (including related resources)
- Including [related resources](https://jsonapi.org/format/#fetching-includes)
  in a request via the `include` query param
- Basic error handling setup. There is still a lot of planning and building to
  do here to get full compliance with the spec, but I have started
  experimenting.

### What has not been done yet

- Validating and setting the
  [required headers](https://jsonapi.org/format/#content-negotiation)
- Full [error handling](https://jsonapi.org/format/#errors)
- Full validation of requests
  - This refers to validating JSON:API specific queries, like `fields` and
    `include`, but _does not_ deal with direct validation of the parameters
    themselves, as that is more of an API implementation detail than adherence
    to the JSON:API spec.
- Adding links to response bodies
- Fetching relationships directly via `/relationships` endpoints
- Filtering results via the flexible
  [`filter query](https://jsonapi.org/format/#fetching-filtering)
  - You could think of this one as a bit of a "stretch goal," because it is not
    a strictly required part of the spec
