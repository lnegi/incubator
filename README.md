Loopback Express Mongodb
========================
A sample app where the frontend is buidl in jquery exposed from backend via Node Express Application
This node application then talks to another rest api provider application Loopback.

The application allows  a user to register , login and search for some Rediff products and then buy those 
products from Rediff site

To get the local up & running , follow below steps

* Mongodb 
- install mongodb 
- create a folder under data folder named loopbackdb or whatever you want
- 


 
Profiles
--------

The following Spring profiles are supported:

* **admin** TBD
* **mockjms** disables JMS for local testing
* **endeca** enables Endeca for search
* **mock** use mocks for local testing

For production **endeca** has to be enabled!

For local testing you can switch between common search mock by activating the **mock** profile or go deeper to an Endeca mock by
activating both profiles **endeca** and **mock** at the same time.
