# Doctor Lookup

### _Epicodus Project in JavaScript, October 20, 2017_

### By Kelsey Langlois

## Description

_A site that allows a user to search for doctors in the Seattle area. Has options to search by Doctor name and by condition or keyword. Information is obtained from the [BetterDoctor API](https://developer.betterdoctor.com/)._

## Setup/Installation Requirements

_In order to prevent publishing of API keys, this app must be downloaded and rebuilt on your machine. To do so, follow the instructions below._

* Clone this repository.
* Add a ```.env``` file to the project root directory.
* Add your key for the [BetterDoctor API](https://developer.betterdoctor.com/) to ```.env``` in the following format:
  ```
  exports.apiKey = "[YOUR API KEY]";
  ```
* Make sure you have Node.js and gulp installed.
    * Instructions for installing Node.js can be found [here](https://www.learnhowtoprogram.com/javascript/getting-started-with-javascript-2f9a73dc-b7f5-4a22-9101-e69d49f552ac/installing-node-js).
    * Once Node is installed, you can install gulp with the command ```npm install gulp -g```
* From the project root directory, run the following commands in the terminal:
  ```
  npm install
  bower install
  gulp build
  gulp serve
  ```
* The site should open in your default web browser at ```localhost:3000``` (or similar localhost-- success message will include access URL).

## Specifications

* Program provides a list of doctors in the Seattle area that match a given name.
  * Returns at maximum 10 doctors.
  * Searches within a 50 mile radius of Seattle.
* Program provides a list of doctors in the Seattle area that treat a given medical issue.
* Program outputs the following information about each doctor:
  * First Name
  * Last Name
  * Address
  * Phone Number
  * Website
  * Whether they are accepting new patients
* If API call results in error, program provides a notification of what the error is.
* If no doctors are found, program provides a notification that no matches were found.

## Support and contact details

_Please contact [kels.langlois@gmail.com](mailto:kels.langlois@gmail.com) with questions, comments, or issues._

## Technologies Used

* JavaScript
* jQuery
* Bootstrap
* Node.js
* Jasmine/Karma
* BetterDoctor API

### License

Copyright (c) 2017 **Kelsey Langlois**

*This software is licensed under the MIT license.*
