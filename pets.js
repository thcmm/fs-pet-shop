'use strict';

// File system vars & dB file
var fs = require('fs');
var path = require('path');
var dbPath = path.join(__dirname, 'pets.json');
// Setup CMD line input args
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var rx = new RegExp(/^\d+$/); // Setup regex check for whole number
if (rx.test(process.argv[3])) { // Test index argument
    var db_index = process.argv[3]; // Assigne index if arg is good
} else {helveta();} // burn

// Toggle debug messages : DEBUG true show | false mask
var DEBUG = false;
function showDbg() {
    if ( DEBUG ) {
        console.log.apply(this, arguments);
    }
  }

showDbg("CMD entry: ", cmd);
showDbg("Index val: ", db_index);

if (cmd === 'read') {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        var petsDB = JSON.parse(data);
        showDbg("petsDB length: ", petsDB.length);
        if (!db_index || db_index > petsDB.length) {console.log("Usage: node pets.js read INDEX");process.exit(1);}
        if (db_index >= 0 && db_index < petsDB.length) {
            console.log(petsDB[db_index]);
        } else {
            console.log(petsDB);
        }
    });
} else {
    helveta();
}

function helveta() {
    console.error("Usage: node pets.js [read | create | update | destroy]");
    process.exit(1);
}


/*
--------------------------------------------------------------------------------
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
