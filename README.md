# Name Checker
The purpose of this project is to interact with a list of names and find last names that match. That said, this application needs to check for approximate matches as well as exact matches.

### Notice
The premise behind this project is currently impossible. Browsers currently block all writing in local files, making it impossible for this application to write into a locally stored spreadsheet. I will not be working on this project until, I can find a work around, and will likely be moving it to a different format.

## Database
This project is for a client who for various reasons cannot have it deployed on any server. Thus the "database" of names is held on a spreadsheet, and javascript is used to read and write into this spreadsheet. It is meant to be held on a computer and opened locally, not over the web.

## Setup
This project is managed with npm. To run it, fork, clone, and run
```
npm i
```
to get the dependencies. To open in testing use
```
npm start
```
Once finished, build with
```
npm run build
```
Then I suggest you move the html out of the public folder and into the root so that the user doesn't have to dig to find it. This may seem like there are unnecessary steps, but for future use, this project is built assuming a web based version will eventually be made.