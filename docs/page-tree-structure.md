# Page Tree Structure
This document details how the URL path structure will function within this application.
This document is subject to change, but hopefully not frequently as it will serve as
the basis of the routing, core to the application!

### The Tree
```
|- /login
|- /register
|- /story-list
|- /story/:id
|   |- /personal
|   |- /party
|   |- /shared-with-me
|   |- /settings
|   |- /note/:id
|- /profile/:id
```