# Applyd — Notes

## Servers & Express

**What is a server?**
A program that stays running and listens for incoming requests, unlike a script that runs once and exits.

**Client vs server:**
React is the client — runs in the browser, no persistent memory of its own. Express is the server — stays alive, listens on a port, holds logic and (later) database access.

**app.listen():**
One-time setup call that starts the server listening on a given port. Doesn't send responses itself — it just activates the server.

**Route handlers (app.get, app.post, etc.):**
Each one reads the incoming request via `req` and sends a response via `res`. Runs per-request, every time that route is hit — unlike `app.listen`, which runs once.

**res.send() vs res.json():**
`res.send()` → plain text / HTML response.
`res.json()` → JSON response with the correct Content-Type header, so the client knows to parse it as JSON.

**Routes like `/` and `/health`:**
Just strings you define — Express attaches no special meaning to either. `/health` is a *developer convention*, not a framework feature: a cheap endpoint that confirms "server is alive," commonly  pinged by deploy platforms.

**package.json vs package-lock.json:**
`package.json` = expected dependencies (with flexible version ranges, e.g. `^4.18.2`).
`package-lock.json` = the exact versions actually installed, including sub-dependencies — guarantees the same setup on any machine.

---

## Databases & MongoDB

**Why a database at all?**
Without one, server data only exists in memory (JS variables) — restart 
the server, it's gone. A database persists data across restarts, in a 
separate storage layer the server connects to.

**MongoDB Atlas — key pieces:**
- A **cluster** is the actual database server instance. Free tier (M0) 
  allows one per project.
- A **database user** (username + password) is separate from your Atlas 
  account login — it's the credential the *app* uses to connect, not a 
  human login.
- **Network Access** must whitelist an IP (or 0.0.0.0/0 for dev) or every 
  connection attempt fails with an auth/network error, even with correct 
  credentials.
- The **connection string** (from Connect → Drivers) contains the db 
  user's username and password in plain text — this is exactly why it 
  lives in `.env`, never hardcoded in a file that gets committed.

**Mongoose vs. raw MongoDB driver:**
Mongoose adds schemas (defined structure + validation) on top of 
MongoDB's naturally flexible, schema-less documents, plus a cleaner 
API (`User.create()`, `User.find()`) instead of writing raw driver 
queries by hand. Same relationship as Express-on-top-of-raw-Node-`http`.

**Why MongoDB fits this project specifically:**
`User` data is fixed-shape (name, email, password hash). `Application` 
data (later) will be irregular — some entries will have a match score, 
some won't yet; some come from manual entry, some from Gmail sync with 
different metadata. A rigid SQL schema would force awkward nullable 
columns for all these variations; MongoDB's flexible documents handle 
this naturally.

---

## `.env` and connection order

**Why `.env` + `.gitignore` together matter:**
`.env` holds real secrets — DB password embedded in the connection 
string, `JWT_SECRET`. A library (`dotenv`) reads this file at runtime 
and injects values into `process.env`; the file itself is never 
`require`d directly. Combined with `.gitignore`, the actual secret 
values never reach GitHub — only code that *expects* them to exist.

**Why `mongoose.connect()` goes before `app.listen()`:**
Want the DB connection established before the server starts accepting 
requests — otherwise early requests that depend on the database could 
hit an undefined connection.

---

## JWT signatures — what actually prevents forgery

A JWT = `header.payload.signature`, three base64 chunks joined by dots.

- **Payload is just decodable, not encrypted.** Anyone can base64-decode 
  it and read the contents (confirmed this on Day 1 via jwt.io).
- **The signature is what matters.** It's produced by running the 
  header + payload through a signing function combined with a secret 
  key that only the server knows (`JWT_SECRET`).
- **Verification = recomputing, not decrypting.** When a token comes 
  back to the server, `jwt.verify()` recalculates what the signature 
  *should* be from the payload + the server's secret, and checks it 
  against the signature attached to the token.
- **Tampering breaks the match.** If someone edits the payload (e.g. 
  changing `userId`) without knowing the secret, they can't produce a 
  matching signature — verification fails and `jwt.verify()` throws an 
  error (doesn't fail silently or return null/false).

**Proved this directly:** signed a real token, changed one character 
in the payload section, ran `jwt.verify()` on the tampered string — 
it threw an error rather than returning the (now-invalid) payload.

**Core takeaway:** the security boundary isn't secrecy of the 
payload — it's secrecy of the signing key. That's what makes a JWT 
trustworthy despite being fully readable by anyone who intercepts it.

---
