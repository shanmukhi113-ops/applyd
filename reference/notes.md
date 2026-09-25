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
