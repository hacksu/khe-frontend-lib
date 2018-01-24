"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io-client");
const log_1 = require("./util/log");
const ServiceClass_1 = require("./ServiceClass");
class Message {
}
exports.Message = Message;
class Event {
}
exports.Event = Event;
class LiveUpdates extends ServiceClass_1.ServiceClass {
    constructor(_service) {
        super(_service);
        this.messageListeners = [];
        this.eventListeners = [];
        this.initConnections();
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
        let messages = io.connect(super.config.api_base + '/messages');
        messages.on('create', this.SockCbGenerator("Create Message", this.messageListeners, (sub) => sub.onCreate));
        messages.on('update', this.SockCbGenerator("Update Message", this.messageListeners, (sub) => sub.onUpdate));
        messages.on('delete', this.SockCbGenerator("Delete Message", this.messageListeners, (sub) => sub.onDelete));
        let events = io.connect(super.config.api_base + '/events');
        events.on('create', this.SockCbGenerator('Delete Event:', this.eventListeners, (sub) => sub.onCreate));
        events.on('update', this.SockCbGenerator('Update Event:', this.eventListeners, (sub) => sub.onUpdate));
        events.on('delete', this.SockCbGenerator('Delete Event:', this.eventListeners, (sub) => sub.onDelete));
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
        return this.messageListeners;
    }
    GetEventListeners() {
        return this.eventListeners;
    }
}
exports.LiveUpdates = LiveUpdates;
