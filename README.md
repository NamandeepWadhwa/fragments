# Fragments

To run any of the scripts, use the following command in the terminal: npm run <script-name>

Replace `<script-name>` with the name of the script you want to run.

Make sure all packages are up-to-date before running scripts. The current dependencies used are:

- express
- cors
- helmet
- compression
- Pino 
## Lab02 Update

We have added the authentication using `Passport BearerStrategy` and `aws-jwt-verify`. They will verify the incoming user. All the authentication code is done in the `src/auth.js` file.

We have also changed the entry point from `src/server.js` to `src/index.js`.

We also have changed the routes. The `/` route is now in `src/routes/index` and is not protected. The `vi/fragments` route is defined in `routes/api/get.js` and is used by `routes/api/index` and is protected.


