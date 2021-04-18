This site will allows users to submit scramble words and exposes them via a public api so services such as my Discord bot Lootcord can use them.

Will work similarly to [Open Trivia DB](https://opentdb.com/), user submitted words must be approved by a moderator before they are exposed on public api.

## Development
Install dependencies:
```bash
yarn
```

Build both frontend and backend and watch files for changes:
```bash
yarn dev
```

## Building for production

Build both frontend and backend to /dist:
```
yarn build
```

Start express server:
```
yarn start
```

## Todo list

- [x] Express server with express-session middleware
- [x] Connect to MongoDB
- [x] Create routes (/api, /users) and import them in server.ts
- [x] Create /models and create a user model containing name, hashed password, maybe date created, and user type (regular would be for normal users and mod would allow them to access authenticated routes on frontend)
- [x] ~~Create a validations folder for use with the users route and use validation methods to ensure data works~~ decided to use Joi instead
- [x] Create a model for the scramble words (should contain word, hint, and 2 words that rhyme with it, also maybe the user who submitted it, and whether or not the word has been approved by mods)
- [x] configure my own webpack settings for frontend
- [ ] Use helmet for express? would be secure (can be done later)
- [x] Use cors middleware for express
- [x] Create frontend using webpack (in progress)
- [x] Use webpack to allow use of any environment variables with PREFIX_ on the frontend
- [x] Use chakra-ui to create frontend (since this project is mostly about full stack and idc about designing a frontend)
- [x] Use redux to maintain user state across components
- [x] ~~Use nprogress bar for suspense loading fallback~~ nprogress wasn't working so I used a react topbar instead
