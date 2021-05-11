var exec = require('child_process').exec;
var os = require('os');

let commands = ["./build"];

if (process.argv.includes("--test")) {
    commands.push("./test");
}

if (os.type() === 'Linux' || os.type() === 'Darwin')
    for (var i = 0; i < commands.length; i++)
        commands[i] = commands[i].concat(".sh");
else if (os.type() === 'Windows_NT') 
    for (var i = 0; i < commands.length; i++)
        commands[i] = "CALL ".concat(commands[i], ".bat");
else
   throw new Error("Unsupported OS found: " + os.type());

let command = commands[0];
for (var i = 1; i < commands.length; i++)
    command = command.concat(" && ", commands[i]);

if (process.argv.includes("--run"))
    command = command.concat(" && node ./src/js/out/main.js")

console.log("Running: ".concat(command));

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log("ERROR:\n".concat(error.message));
        return;
    }
    if (stderr) {
        console.log("STDERR:\n".concat(stderr));
        return;
    }
    console.log(stdout);
});