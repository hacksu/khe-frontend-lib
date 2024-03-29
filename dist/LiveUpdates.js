"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveUpdates = exports.Event = exports.Message = void 0;
const io = require("socket.io-client");
const log_1 = require("./util/log");
const ServiceClass_1 = require("./ServiceClass");
class Message {
    constructor(text) {
        this.text = text;
    }
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
        this.initNotifications();
    }
    initNotifications() {
        // Don't allow browser notifications if the device is mobile
        // https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            try {
                Notification.requestPermission().then((grantStatus) => {
                    this.handleNotifications(grantStatus);
                });
            }
            catch (err) {
                // Safari is weird, so this makes sure that notifications don't break safari
                // https://stackoverflow.com/questions/38114266/web-notifications-not-appearing-in-safari
                if (err instanceof TypeError) {
                    Notification.requestPermission((grantStatus) => {
                        this.handleNotifications(grantStatus);
                    });
                }
                else {
                    throw err;
                }
            }
        }
    }
    handleNotifications(grantStatus) {
        if (grantStatus === 'granted') {
            this.SubscribeToMessages({
                onCreate(msg) {
                    let notif = new Notification("Kent Hack Enough", {
                        body: msg.text,
                    });
                },
                onUpdate(msg) { },
                onDelete(msg) { }
            });
        }
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
        let messages = io.connect(super.config().api_base + '/messages');
        messages.on('create', this.SockCbGenerator("Create Message", this.messageListeners, (sub) => sub.onCreate));
        messages.on('update', this.SockCbGenerator("Update Message", this.messageListeners, (sub) => sub.onUpdate));
        messages.on('delete', this.SockCbGenerator("Delete Message", this.messageListeners, (sub) => sub.onDelete));
        let events = io.connect(super.config().api_base + '/events');
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
    exisitingMessages() {
        return this._axios.request({
            method: 'get',
            url: '/messages'
        })
            .then((data) => {
            return data.data.messages;
        })
            .catch((err) => {
            console.error("Existing Message Request", err);
            return new Array();
        });
    }
    exisitingEvents() {
        return this._axios.request({
            method: 'get',
            url: '/events'
        })
            .then((data) => {
            return data.data.events;
        })
            .catch((err) => {
            console.error("Existing Event Request", err);
            return new Array();
        });
    }
}
exports.LiveUpdates = LiveUpdates;
