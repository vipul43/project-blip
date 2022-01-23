# project-blip

## Description

---

A comprehensive system to track donated blood, its components during various phases

## Process Flow

---

1. **start**(customer) logs into _start.projectblip.org_ and makes **donation** in project-blip associated **bank**(first party) --> _DONATED_
2. **bank**(first party) logs into _bank.projectblip.com_ and enters the **donation** and **start**(customer) details. A **D-id** corresponding to that **start**(customer) and that **donation** is generated. --> _REGISTERED_
3. **donation** is tracked by the **start**(customer) using only the **D-id**. --> _ASSIGNED_
4. **start**(customer) logs into _start.projectblip.com_ and enters the assigned **D-id**, keeps track of his **donation**. --> _TRACKED_
5. **bank**(first party) separates out the components of the **donation**, all the components are always tagged with single **D-id**. --> _SEPERATED_
6. **donation**, separated out circulates between all other **bank**(second party). --> _TRANSFERED_
7. **bank**(first party) and **bank**(second party) logs into _bank.projectblip.com_ and keep on updating the **donation** that are made in them, **first party donation** or **second party donation**. --> _TRANSFERRED_
8. **donation** ultimately reach **end**(hospital). --> _REACHED_
9. **end** logs into _end.projectblip.com_ and updates data similar to **bank**. But **end** has privileged access to **terminate** the **donation** if the **donation** is utilised --> _TERMINATED_, else **donation** keeps on circulating. --> _REACHED_
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
