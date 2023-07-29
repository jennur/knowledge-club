# Knowledge Club 🤔

## Project overview

- `app/views` contains the frontend (Vue application).
- `app/config/db.config.js` is the config file for your database. The values here are taken from the `.env` file which you will create in the root folder. See the `.env.example` file.
- `app/controllers` contains the functions for interacting with the database.
- `app/models` contains all the database models.
- `server.js` is the node server.
- `book-adder` is the python server.

## Set up & install

1. Set up a local postgres database.

#### From the root folder

2. Rename `.env.example` to `.env` and add your credentials and values. **Never edit .env.example or push the `.env` file**
3. Run `npm i` to install the node server
4. Run `npm run install-client` to install the Vue application.
   - The same as running `npm i` from `app/views`.
5. In `/book-adder` create a new venv and run `pip install -r requirements.txt`

## Develop

1. Make sure you have mysql running locally.

#### From the root folder

2. Run `npm run server-only` to start the server.
3. Run `npm run client-only` to start the client.
   - This is the same as running `npm run dev` from `app/views`

#### From `app/views`

3. Run `npm run css`.
   - This will generate your css.
   - With Tailwind you don't need to add any css, you simply add the predefined classes to your elements. See the [Tailwind docs](https://tailwindcss.com/docs/) for available classes.

#### From `/book-adder`
1. Run `waitress-serve --port=3000 server:app`

### Voila 🎉
The client is now available at `localhost:5173`.

The servers are available at:
- Node server `localhost:8080`.
- Python server: `localhost:3000`


## Build for production 🚀

To make the full application ready for production, from the root folder, run `npm run server`. This will build the frontend and run everything from the server.

The full application is now available on `localhost:8080`.
