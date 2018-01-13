import * as io from "socket.io-client"
import { API_BASE } from "./config/config"

export interface ISubscriber<T> {
    onCreate(msg: T) : void;
    onUpdate(msg: T) : void;
    onDelete(msg: T) : void;
}

export interface IMessageSubscriber extends ISubscriber<Message> { }
class Message {
    public text: string;
}

export interface IEventSubscriber extends ISubscriber<Event> { }
class Event {
    public title: String;
    public description: String;
    public start: Date;
    public end: Date;
    public type: String;
    public icon: String;
    public location: String;
}

export class LiveUpdates 
{
    //#region Singleton Members
    private static _instance: LiveUpdates;
    static GetInstance() : LiveUpdates {
        if (LiveUpdates._instance === undefined)
        {
            LiveUpdates._instance = new LiveUpdates();
            LiveUpdates._instance.initConnections();
        }
        return LiveUpdates._instance;
    }
    //#endregion Singleton Members    

    private messageListeners : IMessageSubscriber[];
    private eventListeners : IEventSubscriber[];

    private constructor() {
        this.messageListeners = [];
        this.eventListeners = [];
    }

    public SubscribeToMessages(subscriber: IMessageSubscriber) {
        this.messageListeners.push(subscriber);
    }

    public UnSubMessages(subscriber: IMessageSubscriber) : boolean {
        let pos = this.messageListeners.indexOf(subscriber);
        if (pos !== -1) {
            this.messageListeners.splice(pos, 1)
            return true;
        } else return false;
    }

    public SubscribeToEvents(subscriber: IEventSubscriber) {
        this.eventListeners.push(subscriber);
    }

    public UnSubEvents(subscriber: IEventSubscriber) : boolean {
        let pos = this.eventListeners.indexOf(subscriber);
        if (pos !== -1) {
            this.eventListeners.splice(pos, 1)
            return true;
        } else return false;
    }

    /*
     * Since this is use in a callback,
     * do not use 'this' as it will be undefined.
    */
    private initConnections() {
        let inst = LiveUpdates._instance;

        let messages: SocketIOClient.Socket = io.connect(API_BASE + '/messages');
        messages.on('create', inst.msgCreate);
        messages.on('update', inst.msgUpdate);
        messages.on('delete', inst.msgDelete);

        let events: SocketIOClient.Socket = io.connect(API_BASE + '/events');
        events.on('create', inst.eventCreate);
        events.on('update', inst.eventUpdate);
        events.on('delete', inst.eventDelete);
    }

    /*
     * Since these are use in callbacks,
     * do not use 'this' as it will be undefined.
    */
    //#region Message event handlers.
    private msgCreate(data: Message) : void {
        let inst = LiveUpdates._instance;
        console.log('Create Message' + data)
        for (let i = 0; i < inst.messageListeners.length; i++)
        {
            inst.messageListeners[i].onCreate(data);
        }
    }

    private msgUpdate(data: Message) : void {
        let inst = LiveUpdates._instance;
        console.log('Update Message:' + data);
        for (let i = 0; i < inst.messageListeners.length; i++)
        {
            inst.messageListeners[i].onUpdate(data);
        }
    }

    private msgDelete(data: Message) : void {
        let inst = LiveUpdates._instance;
        console.log('Delete Message:' + data);
        for (let i = 0; i < inst.messageListeners.length; i++)
        {
            inst.messageListeners[i].onDelete(data);
        }
    }
    //#endregion Message event handlers

    /*
     * Since these are use in callbacks,
     * do not use 'this' as it will be undefined.
    */
    //#region /event event handlers
    private eventCreate(data: Event) : void {
        let inst = LiveUpdates._instance;
        console.log('Create Event:' + data);
        for (let i = 0; i < inst.eventListeners.length; i++)
        {
            inst.eventListeners[i].onCreate(data);
        }
    }

    private eventUpdate(data: Event) : void {
        let inst = LiveUpdates._instance;
        console.log('Update Message:' + data);
        for (let i = 0; i < inst.eventListeners.length; i++)
        {
            inst.eventListeners[i].onUpdate(data);
        }
    }

    private eventDelete(data: Event) : void {
        let inst = LiveUpdates._instance;
        console.log('Delete Event:' + data);
        for (let i = 0; i < inst.eventListeners.length; i++)
        {
            inst.eventListeners[i].onDelete(data);
        }
    }
    //#endregion /event event handlers

}