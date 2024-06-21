# This project is a React-based application with TypeScript, focusing on user cards and modals. The project includes components for displaying user information and associated tests to ensure component functionality.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install` 
Install the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode


## Project Architecture:
UserCard.tsx: This component displays user information including an avatar, name, role, join date, and description. It includes a "View More" button to trigger additional actions.

UserList.tsx: This component is responsible for rendering a list of UserCard components. Here have implemented buffered rendering so that application would scale properly if we get more number of images and not all images would be fetched load and they would be fetched only when the user hits the end of scroll.

UserModal.tsx: This component displays detailed user information in a modal window. It shows additional details about the user and provides a "Close" button to dismiss the modal.

