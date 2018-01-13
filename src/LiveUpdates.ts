import * as io from "socket.io-client"
import { API_BASE } from "./config/config"
import { log } from "./util/log"

interface ISubscriber<T> {
    onCreate(msg: T) : void;
    onUpdate(msg: T) : void;
    onDelete(msg: T) : void;
}

export interface IMessageSubscriber extends ISubscriber<Message> { }
export class Message {
    public text: string;
}

export interface IEventSubscriber extends ISubscriber<Event> { }
export class Event {
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
    protected static _instance: LiveUpdates;
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

    protected constructor() {
        this.messageListeners = [];
        this.eventListeners = [];
    }

    //#region Event Subscriptions
    public SubscribeToMessages(subscriber: IMessageSubscriber) {
        this.messageListeners.push(subscriber);
    }

    public UnSubMessages(subscriber: IMessageSubscriber) : boolean {
        return this.UnSub(this.messageListeners, subscriber);
    }

    public SubscribeToEvents(subscriber: IEventSubscriber) {
        this.eventListeners.push(subscriber);
    }

    public UnSubEvents(subscriber: IEventSubscriber) : boolean {
        return this.UnSub(this.eventListeners, subscriber);
    }

    public UnSub<T>(list: ISubscriber<T>[], sub: ISubscriber<T>) : boolean {
        let pos = list.indexOf(sub);
        if (pos !== -1) {
            list.splice(pos, 1)
            return true;
        } else return false;
    }
    //#endregion Event Subscriptions

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
    protected msgCreate(data: Message) : void {
        let inst = LiveUpdates._instance;
        log.debug(['Create Message', data])
        for (let i = 0; i < inst.messageListeners.length; i++)
        {
            inst.messageListeners[i].onCreate(data);
        }
    }

    protected msgUpdate(data: Message) : void {
        let inst = LiveUpdates._instance;
        log.debug(['Update Message:' , data]);
        for (let i = 0; i < inst.messageListeners.length; i++)
        {
            inst.messageListeners[i].onUpdate(data);
        }
    }

    protected msgDelete(data: Message) : void {
        let inst = LiveUpdates._instance;
        log.debug(['Delete Message:' , data]);
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
    protected eventCreate(data: Event) : void {
        let inst = LiveUpdates._instance;
        log.debug(['Create Event:' , data]);
        for (let i = 0; i < inst.eventListeners.length; i++)
        {
            inst.eventListeners[i].onCreate(data);
        }
    }

    protected eventUpdate(data: Event) : void {
        let inst = LiveUpdates._instance;
        log.debug(['Update Message:' , data]);
        for (let i = 0; i < inst.eventListeners.length; i++)
        {
            inst.eventListeners[i].onUpdate(data);
        }
    }

    protected eventDelete(data: Event) : void {
        let inst = LiveUpdates._instance;
        log.debug(['Delete Event:' , data]);
        for (let i = 0; i < inst.eventListeners.length; i++)
        {
            inst.eventListeners[i].onDelete(data);
        }
    }
    //#endregion /event event handlers

}