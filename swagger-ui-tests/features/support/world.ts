'use strict';

import {defineSupportCode} from "cucumber";
import {Builder, Locator, WebElementPromise} from "selenium-webdriver";
const fs = require('fs');
const platform = process.env.PLATFORM || "CHROME";
const defaultTimeout = 10000;
let until = require('selenium-webdriver').until;
let self=this;

const buildChromeDriver = function() {
    return new Builder().forBrowser("chrome").build();
};

 this.waitForElement = function(locator : Locator) : WebElementPromise {
    let driver = this.driver;
    this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)),10000);
    this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)),10000);
    return this.driver.findElement(locator);
};

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(60 * 1000);
});

const World = function World() {

    const screenshotPath = "screenshots";

    this.driver = buildChromeDriver();

    if(!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }


};

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(World);
});
