const core = require('@actions/core');
const os = require("os");
const github = require('@actions/github');
const YAML = require('yaml');

try {
    const separator = core.getInput("separator");
    const list = YAML.parse(core.getInput("list"));
    const source = core.getInput("source");

    console.log("___________________________________________");
    console.log("SOURCE: ");
    console.log(source);
    console.log("___________________________________________");
    console.log("LIST: ");
    console.log(JSON.stringify(list, null, 2));
    console.log("___________________________________________");

    var result = "";

    for (var i = 0; i < list.length; i++) {
        var value = list[i];

        var element = source;
        for (const key in value) {
            while (element.indexOf(key) != -1) {
                element = element.replace(key, value[key]);
            }
        }
        result += element + os.EOL + separator + os.EOL;
    }

    console.log("___________________________________________");
    console.log("RESULT: ");
    console.log(result);

    core.setOutput("value", result);

} catch (error) {
    core.setFailed(error.message);
}