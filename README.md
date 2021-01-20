<h1 align="center">
  Around The World 🌎🌍🌏
</h1>

<p align="center">
  Get to know your team - wherever they are!
</p>

## Setup
1. Use an existing Mapbox account pr set up a new one: https://www.mapbox.com
2. Use an existing MongoDB instance or set up a new one: https://cloud.mongodb.com
3. Create a Slack App for your workspace: https://api.slack.com/apps
4. Create custom fields for your Slack workspace called `Location` and `About me`: https://slack.com/intl/en-bg/help/articles/212281478-Customize-member-profiles
5. Set up required environment variables by either creating a `.env` file locally or configuring your hosting provider (e.g. Netlify):
    ```sh
    DATA_MAPPING_PEOPLE={"pictureUrl":"profile.image_192","name":"profile.real_name","title":"profile.title","location":"profile.fields.Xf0KF2NE7L.value","about":"profile.fields.Xf0KD3NP2F.value"} # Configure these as needed based on your Slack workspace custom fields
    #
    MONGO_DB_URL=YOUR_MONGODB_CONNECTION_URL_HERE # Example: mongodb+srv://username:password@database-url.mongodb.net/around-the-world?retryWrites=true&w=majority
    MONGO_DB_NAME=YOUR_MONGODB_DATABASE_NAME_HERE # Example: around-the-world
    MONGO_DB_COLLECTION=YOUR_MONGODB_DATABASE_COLLECTION_HERE # Example: people
    #
    REACT_APP_INFO_COLUMNS=[{"field":"name","label":"Name","symbol":"👋"},{"field":"title","label":"Title","symbol":"💼"},{"field":"location","label":"Location","symbol":"🏡"},{"field":"about","label":"About me","symbol":"💭"}]
    REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN_HERE
    REACT_APP_MAPBOX_STYLE_URL=YOUR_MAPBOX_STYLE_URL_HERE
    #
    SLACK_BOT_TOKEN=YOUR_SLACK_BOT_TOKEN_HERE
    SLACK_REQUEST_TOKEN=YOUR_SLACK_REQUEST_TOKEN_HERE # The token with which Slack sends you requests
    ```

## Local development
1. If you haven't, run `npm install netlify-cli -g`
2. Start the development server with `npm start`
3. Open http://localhost:3000

# Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
