'use strict';
import {defineSupportCode} from "cucumber";
import {expect} from "chai";
import {Locator, promise, until, WebElement, WebElementPromise} from "selenium-webdriver";
import {todoUiPagesPageObjects} from "../page_objects/todo_ui_pages";
let todoUiPages = require('../page_objects/todo_ui_pages');
const By = require('selenium-webdriver').By;

const tsconfig = require("../../../swagger-ui-tests/tsconfig.json");

let deleteButton: WebElement = By.xpath("//button[text()='Delete']");

defineSupportCode(function ({Given, When, Then}) {

    When(/^I launch the simple todo app$/, async function () {

        this.driver.get(tsconfig.compilerOptions.baseUrl);

    });

    Given(/^I add a new (.*)$/, async function (task) {

        let todoUiPageObject = new todoUiPages();

        todoUiPageObject.addTasks(this,task)

    });

    Then(/^I should see a newly added (.*) in the simple todo app page$/, async function (task) {

        let todoUiPageObject = new todoUiPages();

        let list : string = todoUiPageObject.getRowText(this);

        console.log('My list contains ' + list);
            expect(list).to.contain(task);

        })

    Given(/^I delete the above created task$/, async function () {

        await this.driver.findElement(By.xpath("//button[text()='Delete']")).click();

        console.log('deleted the created task');

    });

    When(/^I click on done$/, async function () {

        await this.driver.findElement(By.className("qa-done-button")).click().then(async () => {

            console.log('done');

        });

    });

    Then(/^I should see the text as (.*)$/, async function (deletedText) {

        await this.driver.findElement(By.css('li')).getText().then(async (list) => {

            console.log("my li list contains :" + list);

            expect(list).to.equal(deletedText);

        });

    });

    Then(/^I delete the above done task$/, async function () {

        await this.driver.findElement(By.className("qa-delete-button")).click().then(async () => {

            console.log('done task is deleted');

        });
    });


    Given(/I delete the existing tasks$/, async function () {

        let self = this;
        await this.driver.wait(until.elementsLocated(By.css('input')));
        const elements = await this.driver.findElements(By.css('li'))

        for (let element of elements) {

            await self.driver.findElement(By.className("qa-delete-button")).click();

        }

    });
});