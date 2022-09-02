## DB DOCUMENTATION

### MongoDB Database - `project_blip`

---

```
Collections
{
    users,
    partners,
    tokens,
    donations,
    faqs,
    blogs
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
    isEmailVerified: Boolean,
    phone: String,
    isPhoneVerified: Boolean,
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
    username: String,
    email: String,
    isEmailVerified: Boolean,
    phone: String,
    isPhoneVerified: Boolean,
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
            auth: enum("User", "Partner", "Admin", "User-Reset-Password", "Partner-Reset-Password", "User-Verify-Email", "User-Verify-Phone"),
            _id: ObjectId
        }
    ],
    updatedAt: Date
}
```

#### Donations Collections - `donations`

---

```
Schema
{
    _id: ObjectId,
    partnerId: ObjectId,
    donorName: String,
    donorPhone: String,
    donorEmail: String,
    donationType: enum("Whole Blood", "Power Red", "Platelet", "Plasma"),
    donationQuantity: String,
    donationDescription: String,
    donationStatus: enum("DONATED", "ASSIGNED", "SEPARATED" "TRANSFERRED", "REACHED", "TERMINATED"),
    isAssigned: Boolean,
    userId: ObjectId,
    donationName: String,
    isUserArchived: Boolean,
    isPartnerArchived: Boolean,
    issues: [
        {
            issueName: String,
            issueDescription: String,
            issueRaised: Date,
        },
    ],
    donationId: String,
    createdAt: Date,
    updatedAt: Date,
    _v: 0
}
```

#### FAQ Collectoins - `faqs`

---

```
Schema
{
    _id: ObjectId,
    question: String,
    answer: String,
    by: enum("User", "Partner", "Admin"),
    name: String
    createdAt: Date,
    updatedAt: Date,
    _v: 0
}
```

#### Blog Collections - `blogs`

---

```
Schema
{
    _id: ObjectId,
    title: String,
    context: String,
    content: String,
    author: String,
    cover: String,
    createdAt: Date,
    updatedAt: Date,
    _v: 0
}
```
