# Story Model Contract
This is the model contract for what is expected from a Story object. This is
subject to change, but this is expected to be constantly up to date with the projects data model.


```javascript
{
    sid,
    ownerId,
    members: [
        ...uid
    ],
    tags: [
        {
            tid,
            name,
            color
        }
    ],
    notes: [
        ...nid
    ]
}
```

#### Referenced Objects
- [Users](./user-model-contract.md)
- [Notes](./note-model-contract.md)

#### Acronym Key
- **sid**: Story ID
- **uid**: User ID
- **tid**: Tag ID
- **nid**: Note ID