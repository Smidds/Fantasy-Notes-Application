# Note Model Contract
This is the model contract for what is expected from a Note object. This is
subject to change, but this is expected to be constantly up to date with the projects data model.


```javascript
{
    nid,
    ownerId,
    title,
    body,
    sharedWithAll,
    tags: [
        ...tid
    ],
    sharedWith: [
        ...uid
    ]
}
```

#### Referenced Objects
- [Story](./story-model-contract.md)
- [User](/.user-model-contract.md)

#### Acronym Key
- **nid**: Note ID
- **uid**: User ID
- **tid**: Tag ID