"use strict";
/* tslint:disable:no-string-literal */
/* tslint:disable:member-ordering */
/* tslint:disable:quotemark */
/* tslint:disable:typedef-whitespace */
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class TodoApi {
    constructor(domain, logger) {
        this.logger = logger;
        this.domain = '';
        this.globalHeaders = {};
        if (domain) {
            this.domain = domain;
        }
        this.resolveTodo = this.resolveTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.getTodos = this.getTodos.bind(this);
    }
    request(method, url, body, headers, queryParameters, form, reject, resolve) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }
        Object.keys(this.globalHeaders).forEach(key => {
            headers[key] = this.globalHeaders[key];
        });
        return axios_1.default({
            method,
            url,
            params: queryParameters,
            data: body,
            headers: headers
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    }
    resolveTodo(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/resolve-todo/{id}';
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            path = path.replace('{id}', `${parameters['id']}`);
            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    removeTodo(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/remove-todo/{id}';
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            path = path.replace('{id}', `${parameters['id']}`);
            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    addTodo(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/add-todo';
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            form = queryParameters;
            queryParameters = {};
            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
    getTodos(parameters) {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/get-todos';
        let body;
        let queryParameters = {};
        let headers = {};
        let form = {};
        return new Promise((resolve, reject) => {
            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function (parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }
            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }
}
exports.default = TodoApi;
//# sourceMappingURL=generated-api.js.map