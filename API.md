## API DOCUMENTATION

### API - STATS

---

| METHOD |                     URL                      |              ACTION              | STATUS  |
| :----: | :------------------------------------------: | :------------------------------: | :-----: |
|  GET   |         `/stats/active-users-count`          |  gets total active users count   | PENDING |
|  GET   |        `/stats/active-partners-count`        | gets total active partners count | PENDING |
|  GET   |           `/stats/donations-count`           |    gets total donations count    | PENDING |
|  GET   | `/stats/donations-count/:donation-center-id` |  gets total donations by center  | PENDING |

### API - ADMIN LEVEL

---

| METHOD |            URL            |             ACTION              | STATUS  |
| :----: | :-----------------------: | :-----------------------------: | :-----: |
|  POST  |      `/admin/signin`      |   validates admin credentials   |  DONE   |
|  POST  |       `/admin/auth`       | authenticates admin credentials |  DONE   |
|  POST  |     `/admin/signout`      |  invalidates admin credentials  |  DONE   |
|  GET   |      `/admin/users`       | gets all users donation details |  DONE   |
|  GET   | `/admin/donation-centres` |    gets all donation centres    | PENDING |
|  POST  | `/admin/donation-centres` |    adds new donation centre     | PENDING |
|  GET   |    `/admin/hospitals`     |       gets all hospitals        | PENDING |
|  POST  |    `/admin/hospitals`     |        adds new hospital        | PENDING |

### API - USER LEVEL

---

| METHOD |                         URL                         |               ACTION                | STATUS |
| :----: | :-------------------------------------------------: | :---------------------------------: | :----: |
|  POST  |                   `/user/signup`                    |            adds new user            |  DONE  |
|  POST  |                   `/user/signin`                    |     validates user credentials      |  DONE  |
|  POST  |                    `/user/auth`                     |   authenticates user credentials    |  DONE  |
|  POST  |                   `/user/signout`                   |    invalidates user credentials     |  DONE  |
|  POST  |                   `/user/update`                    |       update user credentials       |  DONE  |
|  POST  |                   `/user/delete`                    |       delete user credentials       |  DONE  |
|  GET   |          `/user/donation-details/:userId`           | gets donation details of user by id |  DONE  |
|  POST  |          `/user/donation-details/:userId`           |    add new donation for tracking    |  DONE  |
|  PUT   | `/user/donation-details/:userId/update/:donationId` |    update donation for tracking     |  DONE  |

### API - PARTNER LEVEL

---

| METHOD |                            URL                            |                 ACTION                 | STATUS |
| :----: | :-------------------------------------------------------: | :------------------------------------: | :----: |
|  POST  |                     `/partner/signup`                     |            adds new partner            |  DONE  |
|  POST  |                     `/partner/signin`                     |     validates partner credentials      |  DONE  |
|  POST  |                      `/partner/auth`                      |   authenticates partner credentials    |  DONE  |
|  POST  |                    `/partner/signout`                     |    invalidates partner credentials     |  DONE  |
|  GET   |          `/partner/donation-details/:partnerId`           | gets donation details of partner by id |  DONE  |
|  POST  |          `/partner/donation-details/:partnerId`           |     add new donation for tracking      |  DONE  |
|  PUT   | `/partner/donation-details/:partnerId/update/:donationId` |      update donation for tracking      |  DONE  |
