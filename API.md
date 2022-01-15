## API DOCUMENTATION

### API - STATS

---

| METHOD |                     URL                      |             ACTION             |
| :----: | :------------------------------------------: | :----------------------------: |
|  GET   |             `/stats/users-count`             |    gets total donated users    |
|  GET   |           `/stats/donations-count`           |      gets total donations      |
|  GET   | `/stats/donations-count/:donation-center-id` | gets total donations by center |

### API - ADMIN LEVEL

---

| METHOD |            URL            |             ACTION              |
| :----: | :-----------------------: | :-----------------------------: |
|  GET   |      `/admin/users`       | gets all users donation details |
|  GET   | `/admin/donation-centres` |    gets all donation centres    |
|  POST  | `/admin/donation-centres` |    adds new donation centre     |
|  GET   |    `/admin/hospitals`     |       gets all hospitals        |
|  POST  |    `/admin/hospitals`     |        adds new hospital        |

### API - USER LEVEL

---

| METHOD |               URL                |               ACTION                | STATUS  |
| :----: | :------------------------------: | :---------------------------------: | :-----: |
|  POST  |          `/user/signup`          |            adds new user            |  DONE   |
|  POST  |          `/user/signin`          |     validates user credentials      |  DONE   |
|  POST  |           `/user/auth`           |   authenticates user credentials    |  DONE   |
|  POST  |         `/user/signout`          |    invalidates user credentials     |  DONE   |
|  GET   | `/user/donation-details/:userId` | gets donation details of user by id | PENDING |
|  POST  | `/user/donation-details/:userId` |    add new donation for tracking    | PENDING |

### API - PARTNER LEVEL

---

| METHOD |                  URL                   |                 ACTION                 | STATUS  |
| :----: | :------------------------------------: | :------------------------------------: | :-----: |
|  POST  |           `/partner/signup`            |            adds new partner            |  DONE   |
|  POST  |           `/partner/signin`            |     validates partner credentials      |  DONE   |
|  POST  |            `/partner/auth`             |   authenticates partner credentials    |  DONE   |
|  POST  |           `/partner/signout`           |    invalidates partner credentials     |  DONE   |
|  GET   | `/partner/donation-details/:partnerId` | gets donation details of partner by id | PENDING |
|  POST  | `/partner/donation-details/:partnerId` |     add new donation for tracking      | PENDING |
