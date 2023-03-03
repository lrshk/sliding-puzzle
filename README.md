# Project explanation

Requirements of the sliding puzzle game implemented:

Must haves:
- A game field of 3x3 with 8 blocks and one gap; if a block is clicked that borders the gap, it moves into the gap
- Random start locations; but without any duplicate blocks
- ~~The blocks are numbered; 1 to 8~~ Image bonus was implemented
- Responsiveness; the game size adjusts to screen size
- A counter tracking the number of moves

Nice-to-have:

- Parts of an image instead of numbers in the blocks
- Win-condition; if successfully completed, give some kind of feedback
- Dynamic number of blocks; some kind of input whereby the size of the game (and number of blocks) can be increased from 3x3 to any dimension - **Navigate to `localhost:3000/:rows/:columns` for custom size of puzzle. For example, `localhost:3000/4/4` will give you a 4x4 puzzle. If not size indicated it will use the 3x3 by default.**

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
