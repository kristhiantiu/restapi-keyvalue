# Key Value API
* Version 1.0.0

### Dependencies ###
this api uses a number of open source projects to work properly:

* [Nodejsv8.9] - a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

* [Expressjs] - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### How do I install and run it for the first time in development? (w/out docker) ###
Please do the following sequentially:

    1. Copy, edit and save server/config/config.json.example to server/config/config.json

    3. Install Dependencies
        * terminal
            ```bash
            npm install
            ```

    4. Run api
        * terminal
            ```bash
            npm start
            ```

### How do I test my instance using a terminal? ###
Please do the following sequentially:

    1. Make sure that your api is running (see previous steps).

    3. Open apikeyvaluenv.postman_environment.json and edit `keyvalueapi_hostname` accordingly 

    4. Run test
        * terminal
            ```bash
            npm test
            ```

### How do I test my instance using postman? ###
Please do the following sequentially:

    1. Make sure that your api is running (see previous steps).

    2. Open Postman

    3. Import apikeyvaluenv.postman_environment.json and edit `keyvalueapi_hostname` accordingly 

    4. Import apikeyvaluetest.postman_collection.json

    5. Click RUNNER

    6. Select newly imported collection from step 4

    7. Click newly imported environment from step 3

    8. Click Run


### Contribution guidelines ###

* No direct push to major branches (master, develop) - all merge to master must pass through a pull request

### Who do I talk to? ###

* kristhian.tiu@gmail.com


**Have fun CODING!**
[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Nodejsv8.9]: https://nodejs.org/ja/blog/release/v8.9.0/
   [Expressjs]: <https://expressjs.com/>