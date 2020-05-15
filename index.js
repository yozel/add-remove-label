"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;

var core = require("@actions/core");
var github = require("@actions/github");
var token = core.getInput("token");
var type = core.getInput("type");
var label = core.getInput("label");
var number = core.getInput('number') === '' ? github.context.issue.number : parseInt(core.getInput('number'));

function editLabel() {
    console.log(`Add label "${label}"`);
    var client = new github.GitHub(token);
    var context = github.context;
    if (!number) {
        core.setFailed("Issue number is not found");
        return;
    }
    if (type == "add") {
        client.issues.addLabels(__assign(__assign({}, context.repo), { issue_number: number, labels: [label] }))["catch"](function (e) {
            console.log(e.message);
        });
    }
    if (type == "remove") {
        client.issues.removeLabel(__assign(__assign({}, context.repo), { issue_number: number, name: label }))["catch"](function (e) {
            console.log(e.message);
        });
    }
    console.log(`Finished`);
}
editLabel();
