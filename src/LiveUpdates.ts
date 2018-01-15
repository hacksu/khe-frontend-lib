import * as io from "socket.io-client"
import { API_BASE } from "./config/config"
import { log } from "./util/log"

export interface ISubscriber<T> {
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

    protected messageListeners : IMessageSubscriber[];
    protected eventListeners : IEventSubscriber[];

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
        messages.on('create', inst.SockCbGenerator(
            "Create Message",
            inst.messageListeners,
            (sub: IMessageSubscriber) => sub.onCreate
        ));
        messages.on('update', inst.SockCbGenerator(
            "Update Message",
            inst.messageListeners,
            (sub: IMessageSubscriber) => sub.onUpdate
        ));
        messages.on('delete', inst.SockCbGenerator(
            "Delete Message",
            inst.messageListeners,
            (sub: IMessageSubscriber) => sub.onDelete
        ));

        let events: SocketIOClient.Socket = io.connect(API_BASE + '/events');
        events.on('create', inst.SockCbGenerator(
            'Delete Event:',
            inst.eventListeners,
            (sub: IEventSubscriber) => sub.onCreate
            ));
        events.on('update', inst.SockCbGenerator(
            'Update Event:',
            inst.eventListeners,
            (sub: IEventSubscriber) => sub.onUpdate
            ));
        events.on('delete', inst.SockCbGenerator(
            'Delete Event:',
            inst.eventListeners,
            (sub: IEventSubscriber) => sub.onDelete
            ));        
    }

    protected SockCbGenerator<T>(debugMessage: string,
                                    list: ISubscriber<T>[],
                                    callback: Function
                                    ) : Function {
        var savedList = list;
        return (data: T) => {
            log.debug([debugMessage, data]);
            for (let i = 0; i < savedList.length; i++)
            {
                callback(savedList[i])(data);
            }
        }
    }

    protected GetMessageListeners(): IMessageSubscriber[] {
        return LiveUpdates._instance.messageListeners;
    }

    protected GetEventListeners(): IEventSubscriber[] {
        return LiveUpdates._instance.eventListeners;
    }
}