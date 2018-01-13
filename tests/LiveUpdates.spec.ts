import { LiveUpdates, Message, Event, IMessageSubscriber, IEventSubscriber } from '../src/LiveUpdates'
import { expect } from 'chai'
import 'mocha'

class UtilLiveUpdates extends LiveUpdates {
    public constructor() {
        super();
    }

    public static TearDownInstance() {
        LiveUpdates._instance = new LiveUpdates();
    }

    public createMsg(msg: Message) {
        super.msgCreate(msg);
    }
    public updateMsg(msg: Message) {
        super.msgUpdate(msg);
    }
    public deleteMsg(msg: Message) {
        super.msgDelete(msg);
    }

    public createEvent(evt: Event) {
        super.eventCreate(evt);
    }
    public updateEvent(evt: Event) : void {
        super.eventUpdate(evt);
    }
    public deleteEvent(evt: Event) : void {
        super.eventDelete(evt);
    }
} 

describe('GetInstance()', () => {
    it('should be a singleton', () => {
        const inst1 = LiveUpdates.GetInstance();
        const inst2 = LiveUpdates.GetInstance();
        expect(inst1).to.equal(inst2);
    });
});

describe('SubMessages(), UnSubMessages(), msg[cr|up|del]()', () => {
    // Using 'var' because I want this to exist in tests.
    var updater: LiveUpdates;

    var GetMessageListener = (): IMessageSubscriber => {
        return {
            onCreate: () => {},
            onUpdate: () => {},
            onDelete: () => {}
        };
    }

    beforeEach(() => {
        // Tear down the instance of the singleton.
        UtilLiveUpdates.TearDownInstance();
        updater = LiveUpdates.GetInstance();
    });
    
    it('should add and remove listeners', () => {
        const msgListener = GetMessageListener();
        updater.SubscribeToMessages(msgListener);

        expect(updater.UnSubMessages(msgListener)).is.true;
    });

    it('should not remove listeners that dont exist', () => {
        const msgListener = GetMessageListener();

        expect(updater.UnSubMessages(msgListener)).is.false;
    });

    it('should pass a create message to all listeners', () => {
        var testString = 'testing message';
        var expectCbHits = 2;

        const expectCb = (msg: Message) => { 
            expectCbHits--;
            expect(msg.text).equals(testString, 'message err'); 
        };
        
        const passedMsg = new Message();
        passedMsg.text = testString;

        const listener1 = GetMessageListener();
        const listener2 = GetMessageListener();

        listener1.onCreate = expectCb;
        listener2.onCreate = expectCb;

        updater.SubscribeToMessages(listener1);
        updater.SubscribeToMessages(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.createMsg(passedMsg);


        expect(expectCbHits).to.equal(0);
    });

    it('should pass a update message to all listeners', () => {
        var testString = 'testing message';
        var expectCbHits = 2;

        const expectCb = (msg: Message) => { 
            expectCbHits--;
            expect(msg.text).equals(testString, 'message err'); 
        };
        
        const passedMsg = new Message();
        passedMsg.text = testString;

        const listener1 = GetMessageListener();
        const listener2 = GetMessageListener();

        listener1.onUpdate = expectCb;
        listener2.onUpdate = expectCb;

        updater.SubscribeToMessages(listener1);
        updater.SubscribeToMessages(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.updateMsg(passedMsg);


        expect(expectCbHits).to.equal(0);
    });

    it('should pass a delet message to all listeners', () => {
        var testString = 'testing message';
        var expectCbHits = 2;

        const expectCb = (msg: Message) => { 
            expectCbHits--;
            expect(msg.text).equals(testString, 'message err'); 
        };
        
        const passedMsg = new Message();
        passedMsg.text = testString;

        const listener1 = GetMessageListener();
        const listener2 = GetMessageListener();

        listener1.onDelete = expectCb;
        listener2.onDelete = expectCb;

        updater.SubscribeToMessages(listener1);
        updater.SubscribeToMessages(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.deleteMsg(passedMsg);


        expect(expectCbHits).to.equal(0);
    });
});

describe('SubEvents(), UnSubEvents(), event[cr|up|del]()', () => {
    // Using 'var' because I want this to exist in tests.
    var updater: LiveUpdates;

    var GetEventListener = (): IEventSubscriber => {
        return {
            onCreate: () => {},
            onUpdate: () => {},
            onDelete: () => {}
        };
    }

    beforeEach(() => {
        // Tear down the instance of the singleton.
        UtilLiveUpdates.TearDownInstance();
        updater = LiveUpdates.GetInstance();
    });
    
    it('should add and remove listeners', () => {
        const msgListener = GetEventListener();
        updater.SubscribeToEvents(msgListener);

        expect(updater.UnSubEvents(msgListener)).is.true;
    });

    it('should not remove listeners that dont exist', () => {
        const msgListener = GetEventListener();

        expect(updater.UnSubEvents(msgListener)).is.false;
    });

    it('should pass a create event to all listeners', () => {
        var testString = 'testing message';
        var expectCbHits = 2;

        const expectCb = (msg: Event) => { 
            expectCbHits--;
            expect(msg.title).equals(testString, 'message err'); 
        };
        
        const passedMsg = new Event();
        passedMsg.title = testString;

        const listener1 = GetEventListener();
        const listener2 = GetEventListener();

        listener1.onCreate = expectCb;
        listener2.onCreate = expectCb;

        updater.SubscribeToEvents(listener1);
        updater.SubscribeToEvents(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.createEvent(passedMsg);


        expect(expectCbHits).to.equal(0);
    });

    it('should pass a update event to all listeners', () => {
        var testString = 'testing message';
        var expectCbHits = 2;

        const expectCb = (msg: Event) => { 
            expectCbHits--;
            expect(msg.title).equals(testString, 'message err'); 
        };
        
        const passedMsg = new Event();
        passedMsg.title = testString;

        const listener1 = GetEventListener();
        const listener2 = GetEventListener();

        listener1.onUpdate = expectCb;
        listener2.onUpdate = expectCb;

        updater.SubscribeToEvents(listener1);
        updater.SubscribeToEvents(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.updateEvent(passedMsg);


        expect(expectCbHits).to.equal(0);
    });

    it('should pass a delet event to all listeners', () => {
        var testString = 'testing message';
        var expectCbHits = 2;

        const expectCb = (msg: Event) => { 
            expectCbHits--;
            expect(msg.title).equals(testString, 'message err'); 
        };
        
        const passedMsg = new Event();
        passedMsg.title = testString;

        const listener1 = GetEventListener();
        const listener2 = GetEventListener();

        listener1.onDelete = expectCb;
        listener2.onDelete = expectCb;

        updater.SubscribeToEvents(listener1);
        updater.SubscribeToEvents(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.deleteEvent(passedMsg);


        expect(expectCbHits).to.equal(0);
    });
});