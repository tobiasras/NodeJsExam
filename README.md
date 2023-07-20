# This is the nodejs exam at kea datamatiker
* 01 / 06 / 2023
* By / Tobias juul Rasmussen

## The project is a system for maintaining sales leads
You can generate leads, assigning them custom fields and providing each 
with a descriptive summary that supports markdown format. I've developed a 
comprehensive company ecosystem where users can register their company and 
create leads within the scope of their organization. I have also implemented a 
secure system using jwt tokens and have developed a comprehensive user signup process.

**Tools used for the project**
* Express js
* Socket io
* Svelte
* Tailwind css
* Flowbite Svelte


## How to run the app
prerequisite: Have node installed < v. 18.0 or higher & have the packages in installed in the client & server.
### Client part:

1. **Compile svelte project.**\
Go to client folder, and run the script:

```
 npm run build
```

That is it for the client part of the project


### Server part:
Go to Server folder

2. **Create the .env file [Should be located server/.env] \
look at the .env template for help

3. **Run the database script**\
This will make sure the database is connected, 
and setup important indexes in mongo db.


```
npm run databaseSetup
```

4. **[ optional ] Run the setup test-data script**\
Running this script will setup some data that will better showcase the features of this app\
**the project can be run without this.**

```
npm run databaseTestData
```

5. Final step\
to run the server run
```
npm start
```

Now the server should be running














































