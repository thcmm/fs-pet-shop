'use strict';

// File system vars & dB file
var fs = require('fs');
var path = require('path');
var dbPath = path.join(__dirname, 'pets.json');
// Setup CMD line input args
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);

var cmdArgs = process.argv.slice(2);
var createStrArgs = process.argv.slice(4, process.argv.length);
// Open dB and populate petsDB
var init_dB = false;
// Operational vars [0:read | 1:create]
var fileMode = null;
// Flag to process create operation or not
var createFlag = false;
// Pets dB
var petsDB = [];
// Read vars
var db_readIndex = null;
// Create vars
var db_writeIndex = null;
var age = 0;
var kind = "";
var name = "";

// Toggle debug messages : DEBUG true show | false mask
var DEBUG = true;

function showDbg() {
    if (DEBUG) {
        console.log.apply(this, arguments);
    }
}

function checkArgv() {
    showDbg("f:checkArgv");
    switch (cmdArgs[0]) {
        case 'read':
            fileMode = 0; // not using yet
            db_readIndex = checkIndexNumber();
            showDbg("db_readIndex: ", db_readIndex);
            read();
            break;
        case 'create':
            showDbg("f:checkArgv:create");
            fileMode = 1; // not using yet
            age = Number(checkIndexNumber()); // cast to int
            checkStringInput();
            create();
            break;
        default:
            console.log('WFT!');
    }
}


// Check if numeric input is a whole number
function checkIndexNumber() {
    let rx = new RegExp(/^\d+$/); // Setup regex check for whole number
    if (rx.test(process.argv[3])) { // Test index argument
        // db_readIndex = process.argv[3]; // Assigne index if arg is good
        return process.argv[3];
    } else { /* helveta();*/ } // burn
}

function checkStringInput() { // Fix this dirty JUNK!
    showDbg("f:checkStringInput");
    if (typeof process.argv[4] == 'undefined') {
        createError();
    } else if (typeof process.argv[5] == 'undefined') {
        createError();
    } else {
        kind = process.argv[4];
        name = process.argv[5];
    }
}

function openDb() {
    showDbg("f:openDb");
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        petsDB = JSON.parse(data);
        showDbg("petsDB: ", petsDB);
    });
}


function read() {
    showDbg("f:read");
    showDbg("petsDB length: ", petsDB.length);
    if (!db_readIndex) {
        showDbg(petsDB);
        return petsDB;
    }
    //getIndex(petsDB);
    getIndex();
}

function getIndex() { /* removed petsDB argument */
    showDbg("f:getIndex");
    if (!db_readIndex || db_readIndex > petsDB.length) {
        console.log("Usage: node pets.js read INDEX");
        process.exit(1);
    }
    if (db_readIndex >= 0 && db_readIndex < petsDB.length) {
        console.log(petsDB[db_readIndex]);
    } else {
        console.log(petsDB);
    }
}

function create() {
    showDbg("f:create");
    showDbg("age: " + age + " kind: " + kind + " name: " + name);
    var tempObj = {
        age: age,
        kind: kind,
        name: name
    };

    showDbg("tempObj: ", tempObj);
    petsDB.push(tempObj);
    var db_update_JSON = JSON.stringify(petsDB);
    showDbg("db_update_JSON: ", db_update_JSON);
    createFlag = false; // set on exit function

}

function helveta() {
    console.error("Usage: node pets.js [read | create | update | destroy]");
    process.exit(1);
}

function createError() {
    console.log("Usage: node pets.js create AGE KIND NAME");
}

// Open file and populate petsDB once
if (init_dB === false) {
    openDb();
    init_dB = true;
}

checkArgv();


/*
function read() {
    showDbg("f:read");
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        // var petsDB = JSON.parse(data);
        //  petsDB = JSON.parse(data);
        showDbg("petsDB length: ", petsDB.length);
        if (!db_readIndex) {
            showDbg(petsDB);
            return petsDB;
        }
        getIndex(petsDB);
        //if (createFlag == true) {
        //    create(petsDB);
        //}
    });
}
*/


/*
switch (cmd) {
    case "read":
        read(); // Verify the only a Whole number is passed
        break;
    case "create":
        // check create vars
        createFlag = true;
        age = db_readIndex;
        kind = path.basename(process.argv[1]);
        name = path.basename(process.argv[2]);
        create(age, kind, name);
        break;
    default:
        helveta();
}
*/




/*
--------------------------------------------------------------------------------
Fourth task:
- Application must also handle the create subcommand.
- Only when given an age, kind, and name will it create a record in the database.
- Remember to convert the age into an integer. For example:

$ node pets.js create
Usage: node pets.js create AGE KIND NAME

$ node pets.js create 3
Usage: node pets.js create AGE KIND NAME

$ node pets.js create 3 parakeet
Usage: node pets.js create AGE KIND NAME

$ node pets.js create 3 parakeet Cornflake
{ age: 3, kind: 'parakeet', name: 'Cornflake' }

$ node pets.js read 2
{ age: 3, kind: 'parakeet', name: 'Cornflake' }
--------------------------------------------------------------------------------
Third task:
--------------------------------------------------------------------------------
- Application must handle the read subcommand when given an index.
- Read the pets.json file, parse its data to a native JavaScript object, access the correct record, and log it to the console.
- If the call to the filesystem fails for any reason, it should throw the resulting error.
--------------------------------------------------------------------------------
Second task:
--------------------------------------------------------------------------------
- Refactor the application to handle the read subcommand via the process arguments
- Read the pets.json file
- Parse its data to a native JavaScript object
- Log it to the console.
- If the call to the filesystem fails for any reason, it should throw the resulting error.
--------------------------------------------------------------------------------
First task:
--------------------------------------------------------------------------------
- Build a command-line application that displays its usage, ideally to the standard error channel, when invoked without a subcommand.

-The app should exit the process with a non-zero exit code to indicate that it failed to complete any work.

Ex...
$ node pets.js
Usage: node pets.js [read | create | update | destroy]
*/
