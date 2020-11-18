# JTME 

---

A job tracking application to make job searching less of a hassle

![version 1.0](https://img.shields.io/badge/current%20version-1.0-brightgreen)

## Development Tools

- Firebase Auth + Firestore
- React
- Redux + Saga
- Bootstrap

## Use Case

- track your job application status with ease
- track the interactions you have with a company during the job application process

## Use the app!

the app will be hosted soon. Check back for a link to go directly to the application

## Installation

- clone down the repo and run `npm install` to get the necessary dependencies
- the front end of the application runs on `http://localhost:3000`
- to run and connect the application to your own firestore application, follow the [Firebase firestore](https://firebase.google.com/) steps to set up your project then add the Firebase config information to the `firebase/firebase.utils.js` file to connect to your new app with all of the functionality

## Notes

In addition to the web app, we have created a chrome extension which can be downloaded 
[here](https://drive.google.com/drive/folders/11usDbxUbPIb5IwX9P_fglX8tPBLFrrVq?usp=sharing) though it is also included in this repo if you are cloning or downloading (see folder `/jtme-extension`)

### Note in order for the chrome extension to work you MUST create your JTME account with google! 

To add the chrome extension to your browser once downloaded:

- unzip the file
- in chrome.. go to manage extensions
- click load unpacked
- select the folder
- pin to toolbar: 
  - click the puzzle piece "extensions" button on the toolbar between your existing extensions and your google account
  - find the JTME extension and click the pushpin icon if it is not blue

Once signed in it will work on any page. The idea is to save you time from switching back and forth between your spreadsheet and the job listing. 

This project was created for Code With Friends Fall 2020 by
Robert Keller and Brett Bedevian
We'd love to hear your feedback!


### Future Plans

- Scraper to autofill job information for you when you open the chrome extension on a page with a job application
- Add export functionality to take the information into the spreadsheet of your choice (google sheets, Microsoft Excel)
- sort your jobs by open or closed opportunites
- add demo user to check out application without registering your email
- add tutorial to show how to use the app the first time you log in.
