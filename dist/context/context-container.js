"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ContextContainer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextContainer = void 0;
const context_1 = require("./context");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("../constants");
const tools_1 = require("../tools");
let ContextContainer = ContextContainer_1 = class ContextContainer {
    constructor(config, moduleRef) {
        this.config = config;
        this.moduleRef = moduleRef;
        this.contexts = {};
        this.contextStack = [];
    }
    static getId(request) {
        if (!!request.headers) {
            return request.headers[constants_1.HEADER_REQUEST_ID];
        }
        return request[constants_1.HEADER_REQUEST_ID];
    }
    getCurrentId() {
        return this.contextStack[this.contextStack.length - 1];
    }
    current() {
        const request = {
            [constants_1.HEADER_REQUEST_ID]: (0, tools_1.generateId)(),
        };
        return this.contextStack.length
            ? this.contexts[this.getCurrentId()]
            : this.add(request);
    }
    get(request) {
        return this.contexts[ContextContainer_1.getId(request)] ?? null;
    }
    add(request) {
        const id = ContextContainer_1.getId(request);
        this.contextStack.push(id);
        this.contexts[id] = new context_1.Context(id, this.config, request, this.moduleRef);
        return this.contexts[id];
    }
    remove(request) {
        delete this.contexts[ContextContainer_1.getId(request)];
        this.contextStack.pop();
    }
};
ContextContainer = ContextContainer_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CONTEXT_MODULE_CONFIG)),
    __metadata("design:paramtypes", [Object, core_1.ModuleRef])
], ContextContainer);
exports.ContextContainer = ContextContainer;
