# This is the nodejs exam at kea datamatiker
* 01 / 06 / 2023
* By / Tobias juul Rasmussen

## The project is a system for maintaining sales leads
You can generate leads, assigning them custom fields and providing each 
with a descriptive summary that supports markdown format. I've developed a 
comprehensive company ecosystem where users can register their company and 
create leads within the scope of their organization. I have also implemented a 
secure system using tokens and have developed a comprehensive user signup process.

**Tools used for the project**
* Express js
* Socket io
* Svelte
* Tailwind css
* Flowbite Svelte


## How to run the app
the project consist of 2 node apps, Client and Server\

### Setting up Server
prerequisite: Have node installed < v. 18.0 or higher & have the packages in installed, and be located in the server folder.

```
 cd server
 npm -i
```

1. **Create the .env file**\
look at the .env template for help


2. **Run the database script**\
This will make sure the database is connected, 
and setup important indexes in mongo db.


```
npm run databaseSetup
```

3. **[ optional ] Run the setup test-data script**\
Running this script will setup some data that will better showcase the features of this app\
**the project can be run without this.**

```
npm run databaseTestData
```

4. Final step\
to run the server run
```
npm start
```

Now the server should be running


### Setting up CLIENT
prerequisite: Have node installed < v. 18.0 or higher & have the packages in installed, and be located in the client folder.

```
 cd client
 npm -i
```

1. Point the base url store to the server\
located: client/src/stores/globalStore.js

```
export const BASE_URL = readable('http://localhost:8080')
```

2. Run the command:
```
    npm run preview
```

Now the client is booting up like production












































