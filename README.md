# TripMate

## Technology Stack
- Frontend: HTML-CSS-JS
- Backend: Node.js, Express.js
- Database: MongoDB

## Edit Tips
### Start the Server
``` bash
npm install # install all the dependencies
node app.js # if success, you can see "App running on http://localhost:8000"
```
### Hyper Link Format
Since the static resource's directory is assigned as `public` in `app.js`, you don't have to mention `public` when citing files from `public/`.
For example, if you want to include JavaScript files which is `public/js/script.js`, you can just do:
``` html 
<script src='/js/script.js'></script>
```
Icons:
``` html
<img src="/icons/nameofimg.png" alt="your alt text">
```
Stylesheet
``` html
<link rel="stylesheet" href="/css/style.css">
```
(Check the directory structure if you want to cite a file correctly.)

## Problems to solve
### Login authentication
Users must verify their identity before going to all the other pages. If not verified, then stays at the login page.

### Itinerary
1. Date picker requires date verification. (End date should be later than the start date, otherwise error.)
2. Edit Itinerary button is not styled. 
3. The itinerary output tab is covered by the navbar.

### Polls
1. After submit the choice, there is no action.

### Design
The purple is too light so the color contract ratio is not ideal.

## Directory Structure

``` bash
/tripmate-app
├── /node_modules
├── /public             # Static sources
│   ├── /css
│   ├── /js
│   ├── /images
│   ├── /icons
├── /src                # Source directory
│   ├── /views          # EJS templates
│   │   ├── homepage.ejs   # Homepage
│   │   ├── profile.ejs
│   │   ├── login.ejs
│   │   ├── signup.ejs
│   │   ├── trips.ejs
│   ├── /routes         # Routes directory
│   │   ├── index.js
│   │   ├── users.js
│   │   ├── trips.js
│   ├── /controllers    # Business logic (optional)
│   ├── /models         # Database models (optional)
│   ├── app.js          # Express entry point
├── package.json
├── .gitignore
├── README.md

```

