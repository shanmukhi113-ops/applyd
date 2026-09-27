# Applyd — Progress Log

---

## [2026-09-27] — Day 02 — Key task: Connect MongoDB database

**What I learned (in my own words):**
- MongoDB Atlas allows one free cluster per project. Inside the cluster, we created a database user identified by username and password (separate from the Atlas account login itself). Via Clusters → Connect → Drivers, we obtain the connection string and replace the placeholders with our own username and password.
- The `.env` file inside our backend (`/server`) contains the connection string, port, and `JWT_SECRET` — a long random string used to sign and verify our server's tokens. `.env` must be placed inside `.gitignore`, since it contains sensitive info that should never end up on GitHub.
- In `/server/index.js`, we import `dotenv` at the top, then import `mongoose` and store it in a `const mongoose`. We do this — and call `mongoose.connect()` — before `app.listen()`, because we want the server to only start actively accepting requests once the database connection is established, so that any requests relying on the database are properly handled from the start.
- A JSON Web Token (JWT) consists of three base64 strings separated by dots: header, payload, and signature. Any tampering made to the payload after a token is created (via `jwt.sign`) gets flagged when the token is checked with `jwt.verify` — the signature won't match the tampered content, so verification fails.

---

## [2026-09-26] — Day 01 — Key task: Build a server using Express

**What I learned (in my own words):**
- React acts as the client for my app, while Express acts as the server that keeps running to actively listen for requests.
- `package.json` was initially empty, but upon installing Express, a `node_modules` folder also showed up. `package.json` is supposed to contain all the dependencies needed to run the project on any computer.
- Inside `/server/index.js`, the first step imports Express, and the next creates an object called `app` that has its own methods like `.get`, `.post`, etc.
- `app.listen()` is what helps the server listen for requests on a port — it's a one-time server-activating mechanism, not something that sends responses itself.
- The individual route handlers like `app.get()` send responses via `res`. `app.listen()` is a one-time setup, while `res.send()`/`res.json()` happen per request — `res.send()` sends a plain-text/HTML response, while `res.json()` sends a JSON-formatted response.
- `/` and `/health` are just routes, and `/health` has no special meaning attached to it beyond convention — we name it that way so dev platforms can automatically check if the server is alive.
- `package.json` is the expectation, while `package-lock.json` is the reality — meaning `package.json` is the list of expected dependencies that need to be installed, while `package-lock.json` is the list of the actual dependencies that got installed.