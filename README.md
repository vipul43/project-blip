# project-blip

## Description
---
A comprehensive system to track donated blood, its components during various phases

## Process Flow
---
1. **start**(customer) logs into *start.projectblip.org* and makes **donation** in project-blip associated **bank**(first party) --> *DONATED*
2. **bank**(first party) logs into *bank.projectblip.com* and enters the **donation** and **start**(customer) details. A **D-id** corresponding to that **start**(customer) and that **donation** is generated. --> *REGISTERED*
3. **donation** is tracked by the **start**(customer) using only the **D-id**. --> *ASSIGNED*
4. **start**(customer) logs into *start.projectblip.com* and enters the assigned **D-id**, keeps track of his **donation**. --> *TRACKED*
5. **bank**(first party) separates out the components of the **donation**, all the components are always tagged with single **D-id**. --> *SEPERATED*
6. **donation**, separated out circulates between all other **bank**(second party). --> *TRANSFERED*
7. **bank**(first party) and **bank**(second party) logs into *bank.projectblip.com* and keep on updating the **donation** that are made in them, **first party donation** or **second party donation**. --> *TRANSFERRED*
8. **donation** ultimately reach **end**(hospital). --> *REACHED*
9. **end** logs into *end.projectblip.com* and updates data similar to **bank**. But **end** has privileged access to **terminate** the **donation** if the **donation** is utilised --> *TERMINATED*, else **donation** keeps on circulating. --> *REACHED*
10. **donation** is always kept upto date in the database, so that, **start**(customer) querying for their **donation** **status** is served well.

## Brainstorming
---
 - front-end:
   - start.projectblip.com: gives customers(start) interface to view the donation travel through various stages and finally gets terminated
   - bank.projectblip.com: gives users(first party, second party) interface to view(restricted), add(authorised), update(authorised & restricted) data corresponding to the existing donations that are made in their bank, additional donations made in their bank, transferred donations to second or third party
   - end.projectblip.com: gives users(third party) interface to view(restricted), add(authorised), update(authorised & restricted), terminate(authorised & restricted & consented) data corresponding to the existing donations that are made in their bank, additional donations made in their bank, transferred donations to third party, terminate the donations which are made use also add thanksgiving by consent
 - back-end: serves data from database to front-end, retrieves data from front-end and updates database
 - database: holds data on D-id basis.

 ## Briefing
 - customers: project-blip users
 - First-Party Users: Donation Banks
 - Second-Party Users: Other Banks
 - Third-Party Users: Hospitals
 - status: DONATED, REGISTERED, ASSIGNED, TRACKED, SEPERATED, TRANSFERED, REACHED, TERMINATED
