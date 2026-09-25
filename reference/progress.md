# Applyd — Progress Log

---

## [2026-09-DD] — Day 01 — Key task: Build a server using Express

**What I learned (in my own words):**
 React acts as the client for my app while Express acts the server that keeps running to actively listen to any requests. package.json was initially empty but upon installing express, a node_modules folder also showed up. package.json is supposed to contain all the dependencies to be able to run it on any computer. Inside /server/index.js is the first step that imports express and the next creates an object called app that has its own methods like get, post etc. app.listen is what helps the server listen to any requests on port 3000 and its like a server activating mechanism. The individual route handlers like app.get() send responses via res... app.listen is a one-time setup while res.send, res.json happen per request res.send sends a plain-text HTML Response while res.json sends a json formatted response. / and /health are just routes and /health has no special meaning attached to it, just a convention. We name it that way for dev platforms to automatically check if the server is alive. package.json is the expectation while package-lock.json is the reality, meaning package.json is the list of expected dependenices that need to be installed while package-lock.json is the list of actual dependencies that got installed.
- 
