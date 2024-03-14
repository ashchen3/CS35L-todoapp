# CS 35L

CS 35L Winter 24 Final Project

## Setup Instructions
First, clone the repository
```bash
git clone https://github.com/ashchen3/CS35L-todoapp.git
```

### Regarding Credentials
The API key (embedded in the ElephantSQL link) in `/backend/.env` has been intentionally expired. Contact teongseng@g.ucla.edu for the API key to be used as `DEV_DATABASE_URL`. 

For the JWT secret in the same /backend/.env file, any UTF-8 string may be used. If you desire to generate a new JWT secret, use
```js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
and assign it to the `JWT_SECRET` backend environment variable (in the same `/backend/.env` file). 

### Starting the Application
To start the server, simply run the `startup.sh` script at the root level of the repo
```bash
./startup.sh
```