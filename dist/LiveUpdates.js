"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var io = require("socket.io-client");
var log_1 = require("./util/log");
var ServiceClass_1 = require("./ServiceClass");
var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());
exports.Message = Message;
var Event = /** @class */ (function () {
    function Event() {
    }
    return Event;
}());
exports.Event = Event;
var LiveUpdates = /** @class */ (function (_super) {
    __extends(LiveUpdates, _super);
    function LiveUpdates(_service) {
        var _this = _super.call(this, _service) || this;
        _this.messageListeners = [];
        _this.eventListeners = [];
        _this.initConnections();
        return _this;
    }
    //#region Event Subscriptions
    LiveUpdates.prototype.SubscribeToMessages = function (subscriber) {
        this.messageListeners.push(subscriber);
    };
    LiveUpdates.prototype.UnSubMessages = function (subscriber) {
        return this.UnSub(this.messageListeners, subscriber);
    };
    LiveUpdates.prototype.SubscribeToEvents = function (subscriber) {
        this.eventListeners.push(subscriber);
    };
    LiveUpdates.prototype.UnSubEvents = function (subscriber) {
        return this.UnSub(this.eventListeners, subscriber);
    };
    LiveUpdates.prototype.UnSub = function (list, sub) {
        var pos = list.indexOf(sub);
        if (pos !== -1) {
            list.splice(pos, 1);
            return true;
        }
        else
            return false;
    };
    //#endregion Event Subscriptions
    /*
     * Since this is use in a callback,
     * do not use 'this' as it will be undefined.
    */
    LiveUpdates.prototype.initConnections = function () {
        var messages = io.connect(_super.prototype.config.call(this).api_base + '/messages');
        messages.on('create', this.SockCbGenerator("Create Message", this.messageListeners, function (sub) { return sub.onCreate; }));
        messages.on('update', this.SockCbGenerator("Update Message", this.messageListeners, function (sub) { return sub.onUpdate; }));
        messages.on('delete', this.SockCbGenerator("Delete Message", this.messageListeners, function (sub) { return sub.onDelete; }));
        var events = io.connect(_super.prototype.config.call(this).api_base + '/events');
        events.on('create', this.SockCbGenerator('Delete Event:', this.eventListeners, function (sub) { return sub.onCreate; }));
        events.on('update', this.SockCbGenerator('Update Event:', this.eventListeners, function (sub) { return sub.onUpdate; }));
        events.on('delete', this.SockCbGenerator('Delete Event:', this.eventListeners, function (sub) { return sub.onDelete; }));
    };
    LiveUpdates.prototype.SockCbGenerator = function (debugMessage, list, callback) {
        var savedList = list;
        return function (data) {
            log_1.log.debug([debugMessage, data]);
            for (var i = 0; i < savedList.length; i++) {
                callback(savedList[i])(data);
            }
        };
    };
    LiveUpdates.prototype.GetMessageListeners = function () {
        return this.messageListeners;
    };
    LiveUpdates.prototype.GetEventListeners = function () {
        return this.eventListeners;
    };
    return LiveUpdates;
}(ServiceClass_1.ServiceClass));
exports.LiveUpdates = LiveUpdates;
