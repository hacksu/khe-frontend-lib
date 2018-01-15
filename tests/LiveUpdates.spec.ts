import { LiveUpdates, Message, Event, IMessageSubscriber, IEventSubscriber, ISubscriber } from '../src/LiveUpdates'
import { expect } from 'chai'
import 'mocha'

/**
 * @description Provide access to private members
 * for testing. Allows destruction of singleton
 * and access to mock socketio events.
 */
class UtilLiveUpdates extends LiveUpdates {
    public constructor() {
        super();
    }

    public static TearDownInstance() {
        LiveUpdates._instance = new LiveUpdates();
    }

    public SockCbGenerator<T>(debugMessage: string,
        list: ISubscriber<T>[],
        callback: Function
        ) : Function {
        return super.SockCbGenerator('UtilLiveUpdates - '+debugMessage, list, callback);
    }

    public GetMessageListeners(): IMessageSubscriber[] {
        return super.GetMessageListeners();
    }

    public GetEventListeners(): IEventSubscriber[] {
        return super.GetEventListeners();
    }
} 

describe('GetInstance()', () => {
    it('should be a singleton', () => {
        const inst1 = LiveUpdates.GetInstance();
        const inst2 = LiveUpdates.GetInstance();
        expect(inst1).to.equal(inst2);
    });
});

/**
 * Because events and messages use the same logic,
 * we only need to test one of the two.
 */
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

    var testString = 'testing message';
    var GetExampleEvent = () => {
        const passedEvent = new Event();
        passedEvent.title = testString;
        return passedEvent;
    }

    var expectCbHits: number;
    var expectCb = (msg: Event) => { 
        expectCbHits--;
        expect(msg.title).equals(testString, 'message err'); 
    };

    var testGenerator = (eventName: string, 
                            callback: Function,
                            passedEvent: Event,
                            listener1: IEventSubscriber,
                            listener2: IEventSubscriber
                        ) => {
        updater.SubscribeToEvents(listener1);
        updater.SubscribeToEvents(listener2);

        const utilUpdates = new UtilLiveUpdates();
        utilUpdates.SockCbGenerator(
            eventName,
            utilUpdates.GetEventListeners(),
            callback
        )(passedEvent);

        expect(expectCbHits).to.equal(0);
    };

    beforeEach(() => {
        // Tear down the instance of the singleton.
        UtilLiveUpdates.TearDownInstance();
        updater = LiveUpdates.GetInstance();
        expectCbHits = 2;
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
        const listener1 = GetEventListener();
        const listener2 = GetEventListener();

        listener1.onCreate = expectCb;
        listener2.onCreate = expectCb;
        
        testGenerator('Create Event Test', 
                        (sub: IEventSubscriber) => sub.onCreate,
                        GetExampleEvent(),
                        listener1,
                        listener2
                    );
    });

    it('should pass a update event to all listeners', () => {
        const listener1 = GetEventListener();
        const listener2 = GetEventListener();

        listener1.onUpdate = expectCb;
        listener2.onUpdate = expectCb;

        testGenerator('Update Event Test',
                        (sub: IEventSubscriber) => sub.onUpdate,
                        GetExampleEvent(),
                        listener1,
                        listener2
                    );
    });

    it('should pass a delete event to all listeners', () => {
        const listener1 = GetEventListener();
        const listener2 = GetEventListener();
    
        listener1.onDelete = expectCb;
        listener2.onDelete = expectCb;

        testGenerator('Delete Event Test',
                        (sub: IEventSubscriber) => sub.onDelete,
                        GetExampleEvent(),
                        listener1,
                        listener2
                    );
    });
});