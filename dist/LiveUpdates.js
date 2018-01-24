"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
const config_1 = require("./config/config");
const log_1 = require("./util/log");
class Message {
}
exports.Message = Message;
class Event {
}
exports.Event = Event;
class LiveUpdates {
    static GetInstance() {
        if (LiveUpdates._instance === undefined) {
            LiveUpdates._instance = new LiveUpdates();
            LiveUpdates._instance.initConnections();
        }
        return LiveUpdates._instance;
    }
    constructor() {
        this.messageListeners = [];
        this.eventListeners = [];
    }
    //#region Event Subscriptions
    SubscribeToMessages(subscriber) {
        this.messageListeners.push(subscriber);
    }
    UnSubMessages(subscriber) {
        return this.UnSub(this.messageListeners, subscriber);
    }
    SubscribeToEvents(subscriber) {
        this.eventListeners.push(subscriber);
    }
    UnSubEvents(subscriber) {
        return this.UnSub(this.eventListeners, subscriber);
    }
    UnSub(list, sub) {
        let pos = list.indexOf(sub);
        if (pos !== -1) {
            list.splice(pos, 1);
            return true;
        }
        else
            return false;
    }
    //#endregion Event Subscriptions
    /*
     * Since this is use in a callback,
     * do not use 'this' as it will be undefined.
    */
    initConnections() {
        let inst = LiveUpdates._instance;
        let messages = io.connect(config_1.API_BASE + '/messages');
        messages.on('create', inst.SockCbGenerator("Create Message", inst.messageListeners, (sub) => sub.onCreate));
        messages.on('update', inst.SockCbGenerator("Update Message", inst.messageListeners, (sub) => sub.onUpdate));
        messages.on('delete', inst.SockCbGenerator("Delete Message", inst.messageListeners, (sub) => sub.onDelete));
        let events = io.connect(config_1.API_BASE + '/events');
        events.on('create', inst.SockCbGenerator('Delete Event:', inst.eventListeners, (sub) => sub.onCreate));
        events.on('update', inst.SockCbGenerator('Update Event:', inst.eventListeners, (sub) => sub.onUpdate));
        events.on('delete', inst.SockCbGenerator('Delete Event:', inst.eventListeners, (sub) => sub.onDelete));
    }
    SockCbGenerator(debugMessage, list, callback) {
        var savedList = list;
        return (data) => {
            log_1.log.debug([debugMessage, data]);
            for (let i = 0; i < savedList.length; i++) {
                callback(savedList[i])(data);
            }
        };
    }
    GetMessageListeners() {
        return LiveUpdates._instance.messageListeners;
    }
    GetEventListeners() {
        return LiveUpdates._instance.eventListeners;
    }
}
exports.LiveUpdates = LiveUpdates;
