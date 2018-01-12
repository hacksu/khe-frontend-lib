import * as io from "socket.io-client"
import { API_BASE } from "./config/config"

export class LiveUpdates 
{
    //#region Singleton Members
    private static _instance: LiveUpdates;
    static GetInstance() : void {
        if (LiveUpdates._instance === undefined)
        {
            LiveUpdates._instance = new LiveUpdates();
            if (!("Notification" in window))
            {
                console.error("Live notifications not supported.");
            } else {
                Notification.requestPermission(LiveUpdates._instance.initConnections)
            }
        }
    }
    //#endregion Singleton Members

    private constructor() {

    }

    private initConnections(permission: string) {
        if (permission !== "granted")
        {
           return;
        }

        var socket: SocketIOClient.Socket = io.connect(API_BASE + '/messages');
        socket.on('create', (data: any) => {
            console.log(data);
        });

        new Notification("KHE Update", {
            body: "Socket set up"
        });
    }
}