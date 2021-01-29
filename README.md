<h1 align="center">
  Around the World 🌎🌍🌏
</h1>

<p align="center">
  Get to know your team - wherever they are!
</p>

## Setup
First, set up required environment variables by either creating a `.env` file locally or configuring your hosting provider (e.g. Netlify):
```sh
DATA_MAPPING_PEOPLE={"id":"id","pictureUrl":"profile.image_192","name":"profile.real_name","title":"profile.title","location":"profile.fields.Xf0KF2NE7L.value","about":"profile.fields.Xf01KN2SKYDB.value"} # Configure these as needed based on your Slack workspace custom fields
JOIN_MESSAGE="🥳 Awesome! You've joined the rest of the team at https://YOUR-AWESOME-WEBSITE-URL.com"
LEAVE_MESSAGE="😢 We're sad to see you go!"

MONGO_DB_COLLECTION=YOUR_MONGODB_DATABASE_COLLECTION_HERE # Example: people
MONGO_DB_NAME=YOUR_MONGODB_DATABASE_NAME_HERE # Example: around-the-world
MONGO_DB_URL=YOUR_MONGODB_CONNECTION_URL_HERE # Example: mongodb+srv://username:password@database-url.mongodb.net/around-the-world?retryWrites=true&w=majority

SLACK_BOT_TOKEN=YOUR_SLACK_BOT_TOKEN_HERE
SLACK_REQUEST_TOKEN=YOUR_SLACK_REQUEST_TOKEN_HERE # The token with which Slack sends you requests

VUE_APP_INFO_COLUMNS=[{"field":"name","label":"Name","symbol":"👋"},{"field":"title","label":"Title","symbol":"💼"},{"field":"location","label":"Location","symbol":"🏡"},{"field":"about","label":"About me","symbol":"💭"}]
VUE_APP_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN_HERE
VUE_APP_MAPBOX_STYLE_URL=YOUR_MAPBOX_STYLE_URL_HERE
```

## Local development
1. If you haven't, run `npm install netlify-cli -g`
2. Start the development server with `npm start`
3. Open http://localhost:3000

## Accounts
1. Create a Slack App for your workspace: https://api.slack.com/apps
2. Optionally, create custom fields for your Slack workspace called `Location` and `About me`: https://slack.com/intl/en-bg/help/articles/212281478-Customize-member-profiles
3. Use an existing Mapbox account or set up a new one: https://www.mapbox.com
4. Use an existing MongoDB instance or set up a new one: https://cloud.mongodb.com

# Start
```bash
npm start
```

# Build
```bash
npm run build
```

# Test
Run tests related to locally changed files, e.g. during development:
```bash
npm test
```

Or run all the tests, e.g. in CI:
```bash
npm run test.all
```

# Lint
Check code for formatting errors:
```bash
npm run lint
```

Or also attempt to fix them:
```bash
npm run lint.fix
```
