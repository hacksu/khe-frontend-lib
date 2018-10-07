import * as io from "socket.io-client"
import { log } from "./util/log"
import { ServiceClass } from "./ServiceClass";

export interface ISubscriber<T> {
    onCreate(msg: T) : void;
    onUpdate(msg: T) : void;
    onDelete(msg: T) : void;
}

export interface IMessageSubscriber extends ISubscriber<Message> { }
export class Message {
    public text: string;
    public constructor(text: string) {
        this.text = text;
    }
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

export class LiveUpdates extends ServiceClass
{
    protected messageListeners : IMessageSubscriber[];
    protected eventListeners : IEventSubscriber[];

    public constructor(_service: ServiceClass) {
        super(_service);
        this.messageListeners = [];
        this.eventListeners = [];
        this.initConnections();
        this.initNotifications()
    }

    private initNotifications() {
        // Browsers that dont support notifications throw an undefined error.
        ///if (!Notification) return;
        ///
        ///Notification.requestPermission().then((grantStatus) => {
        ///    if (grantStatus === 'granted') {
        ///        this.SubscribeToMessages({
        ///            onCreate(msg){
        ///                let notif = new Notification("Kent Hack Enough", {
        ///                    body: msg.text,
        ///                });
        ///            },
        ///            onUpdate(msg){},
        ///            onDelete(msg){}
        ///        })
        ///    }
        ///})
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
        let messages: SocketIOClient.Socket = io.connect(super.config().api_base + '/messages');
        messages.on('create', this.SockCbGenerator(
            "Create Message",
            this.messageListeners,
            (sub: IMessageSubscriber) => sub.onCreate
        ));
        messages.on('update', this.SockCbGenerator(
            "Update Message",
            this.messageListeners,
            (sub: IMessageSubscriber) => sub.onUpdate
        ));
        messages.on('delete', this.SockCbGenerator(
            "Delete Message",
            this.messageListeners,
            (sub: IMessageSubscriber) => sub.onDelete
        ));

        let events: SocketIOClient.Socket = io.connect(super.config().api_base + '/events');
        events.on('create', this.SockCbGenerator(
            'Delete Event:',
            this.eventListeners,
            (sub: IEventSubscriber) => sub.onCreate
            ));
        events.on('update', this.SockCbGenerator(
            'Update Event:',
            this.eventListeners,
            (sub: IEventSubscriber) => sub.onUpdate
            ));
        events.on('delete', this.SockCbGenerator(
            'Delete Event:',
            this.eventListeners,
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
        return this.messageListeners;
    }

    protected GetEventListeners(): IEventSubscriber[] {
        return this.eventListeners;
    }

    public exisitingMessages(): Promise<Message[]> {
        return this._axios.request({
            method: 'get',
            url:'/messages'
        })
        .then((data) => {
            return data.data.messages as Message[]
        })
        .catch((err) => {
            console.error("Existing Message Request", err);
            return new Array<Message>();
        })
    }

    public exisitingEvents(): Promise<Event[]> {
        return this._axios.request({
            method: 'get',
            url:'/events'
        })
        .then((data) => {
            return data.data.events as Event[]
        })
        .catch((err) => {
            console.error("Existing Event Request", err);
            return new Array<Event>();
        })
    }
}