'use strict';

import {defineSupportCode} from "cucumber";
import {Builder, Locator, WebElement, WebElementPromise} from "selenium-webdriver";
const fs = require('fs');
const platform = process.env.PLATFORM || "CHROME";
const defaultTimeout = 10000;
let until = require('selenium-webdriver').until;
let self=this;
var webdriver = require('selenium-webdriver');
// var co = require('co');
const buildChromeDriver = function() {
    return new Builder().forBrowser("chrome").build();
};

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(60 * 1000);
});

const World = function World() {

    const screenshotPath = "screenshots";

    this.driver = buildChromeDriver();

    this.callbackToPromise = function(method, ...args) {
        return new Promise(function(resolve, reject) {
            return method(...args, function(err, result) {
                return err ? reject(err) : resolve(result);
            });
        });
    };

    this.waitForElement = function(locator : Locator) : WebElementPromise {
        let driver = this.driver;
        this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)),10000);
        return this.driver.findElement(locator);
    };

    this.waitForElementAndClick = function (locator: Locator) : void {
        let ele = this.waitForElement(locator);
        ele.click();
    };

    this.getElementText = function (locator : Locator) : string {
        let driver = this.driver;
        let ele = this.waitForElement(locator);
        return ele.getText();
    };

    if(!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }


};

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(World);
});
