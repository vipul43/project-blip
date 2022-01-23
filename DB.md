## DB DOCUMENTATION

### MongoDB Database - `project_blip`

---

```
Collections
{
    users,
    partners,
    tokens
}
```

#### First Party User Collection - `users`

---

```
Schema
{
    _id: ObjectId,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    phone: String,
    password: String,
    role: String,
    createdAt: Date,
    updatedAt: Date,
    _v: 0
}
```

#### Second and Third Party User Collection - `partners`

---

```
Schema
{
    _id: ObjectId,
    orgName: String,
    partnerName: String,
    email: String,
    phone: String,
    type: enum("Donation Center", "Hospital"),
    address: {
        houseno: String,
        area_and_street: String,
        landmark: String,
        country: String,
        state: String,
        pincode: String,
        city_town_district: String,
    },
    password: String,
    role: String,
    createdAt: Date,
    updatedAt: Date,
    _v: 0
}
```

#### Tokens Collection - `tokens`

---

```
Schema
{
    _id: ObjectId,
    userId: ObjectId,
    _v: 0,
    createdAt: Date,
    tokens: [
        {
            token: String,
            creation: Date,
            _id: ObjectId
        }
    ],
    updatedAt: Date
}
```
