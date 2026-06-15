# Student Information API - Assignment

## Steps

### Step 1 - Initialize The project

```bash
# Create the directory

mkdir student-api

cd student api

# Initialize the project

npm init -y

# Install express.js

npm install express
```

### Step 2 - Use ES Module
Change the type in package.json to ECMA Script module instead of Common JS so that we can use import. 

### Step 3 - Write express's boilerplate
In this step, create app.js, then we import the express, create the default route, and make the app listen on port 3000.

```bash
touch app.js
code app.js
```

### Step 4 - Test and Install Nodemon
We can test if the app is listening correctly by using `node app.js`, but instead, we'll install nodemon so that the server update without manual restart.

```bash
npm install nodemon --save-dev # save as a dev dependency
```

Optionally, we add dev script for running the server:
```js
// ...
 "scripts": {
    //Other scripts,
    "dev": "nodemon app.js"
  }
// ...
```

Then start the server with `npm run dev`

Note: We should see in the console: Server is listening on port 3000

### Step 5 - Testing the API
Now we create an api request file to test the api(root)

```http
GET http://localhost:3000
```

### Step 6 - Creating Other Routes
In this step, we create the remaining routes:
- student 
- about
- skills
- students

### Step 7 (Final) - Ensure All Routes are Working
Testing all the routes:
```https
### /
GET http://localhost:3000/

### /student
GET http://localhost:3000/student

### /about
GET http://localhost:3000/about

### /skills
GET http://localhost:3000/skills

### /students
GET http://localhost:3000/students
```