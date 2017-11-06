'use strict';

import {defineSupportCode} from 'cucumber';
import {expect} from "chai";
import TodoApi from "../../generated-api";
import {Given, When, Then} from 'cucumber';

const file = require('../../properties/input.properties')

const todoApi = new TodoApi(file.inputProperties.URL);
let key: any;
let todo: any;
let newResponse: any;

Given(/^I get a list of to-dos$/, async () => {

    todo = await todoApi.getTodos({});

    if (todo) {
        for (let i = 0; i < todo.length; i++) {
            key = todo[i]["id"];
            console.log("***** Resolved status is :" + todo[i]["resolved"] + ' *****')
        }
    }
});

Given(/^I delete all the existing to-do tasks$/, async () => {
    if (key) {
        console.log("***** Response length is : " + todo.length + ' *****');
        for (let i: number = 0; i < todo.length; i++) {
            let delResponse = await todoApi.removeTodo({
                'id': todo[i]["id"],
                '$queryParameters': {
                    'id': todo[i]["id"]
                }
            });
            console.log('******* Deleted response is :'+delResponse+' ********')
        }
    }

});

When(/^I add a new task with title (.*)$/, async (title: string) => {

    newResponse = await todoApi.addTodo({
        'body': {
            'id': '1',
            'title': title,
            'resolved': true
        }
    });

});

Then(/^I should get a response with an id, title (.*) and a task resolved status as (.*)$/, (title: string, resolved: string) => {

    let expected = (resolved == 'true');

    expect(newResponse[0]["resolved"]).to.equal(expected);
    expect(parseInt(newResponse[0]["id"])).to.be.a('number');
    expect(newResponse[0]["title"]).to.equal(title);
});

When(/^I update a task and resolve it$/, async () => {

    newResponse = await todoApi.resolveTodo({
        'id': newResponse[0]["id"],
        '$queryParameters': {
            'id': newResponse[0]["id"]
        }
    })

});

Then(/^the list is empty$/, () => {

    expect(todo).to.be.empty;

});


