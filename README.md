# Music Library Demo App

## Feature List
- [x] Load albums from Discogs API
- [x] Display album name, year, artist(s), label(s), format(s)
- [x] User can add new shelf
- [x] User can edit name of shelf
- [x] User can delete shelf
- [x] User can drag and drop albums between shelves (including "unshelved")
- [x] User can load more pages of albums while available
- [ ] User can expand/collapse shelves to more easily drag between them (shorter distance)
- [ ] User can re-order shelves
- [ ] User can filter unshelved items
- [ ] User can choose which Discogs username to request data from (currently hard-coded)

## To-dos
- [ ] Color variables
- [ ] Drag/drop styles
- [ ] Improve responsiveness
- [ ] Refactor
- [ ] Prop-types
- [ ] Unit tests
- [ ] Modal instead of alert box

## Reasoning
- Did not load all albums initially 
  - Displaying that many albums at once would be overwhelming to a user unless the list was truncated and/or searchable
  - The API caps requests at 25/min when unauthenticated, and 60 per minute when authenticated. Given the provided user had 4527 albums at the time of the project, there was no way to feasibly display all albums on initial page load. 
- Chose drag-and-drop library because of emphasis on accessibility.

---------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

