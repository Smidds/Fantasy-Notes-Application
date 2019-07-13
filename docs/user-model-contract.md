# User Model Contract
This is the model contract for what is expected from a User object. This is
subject to change, but this is expected to be constantly up to date with the projects data model.


```javascript
{
    uid,
    displayName,
    stories: {
        ownerId,
        members: [
            ...sid
        ]
    }   
}
```

#### Referenced Objects
- [Story](./story-model-contract.md)

#### Acronym Key
- **sid**: Story ID
- **uid**: User ID
