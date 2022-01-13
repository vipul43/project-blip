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

| METHOD |               URL                |               ACTION                |
| :----: | :------------------------------: | :---------------------------------: |
|  POST  |          `/user/signup`          |   adds new user donation details    |
|  POST  |          `/user/signin`          | validates existing user credentials |
|  POST  |           `/user/auth`           | validates existing user credentials |
|  POST  |         `/user/signout`          | validates existing user credentials |
|  GET   | `/user/donation-details/:userId` | gets donation details of user by id |
|  POST  | `/user/donation-details/:userId` |    add new donation for tracking    |

### API - DONATION CENTER LEVEL

---

| METHOD |         URL         |               ACTION               |
| :----: | :-----------------: | :--------------------------------: |
|  GET   | `/partner/:user-id` | get donation details of user by id |
|  POST  | `/partner/:user-id` |     add user to donation list      |

### API - HOSPITAL LEVEL

---

| METHOD |         URL         |             ACTION              |
| :----: | :-----------------: | :-----------------------------: |
|  GET   | `/partner/:user-id` | get usage details of user by id |
|  POST  | `/partner/:user-id` |      add user to hospital       |
