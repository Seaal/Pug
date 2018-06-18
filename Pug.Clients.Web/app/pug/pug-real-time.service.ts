import { Observable } from "rxjs";

import { BaseSignalRService } from "../common/base-signalr.service";
import { Server } from "./server";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class PugRealTimeService extends BaseSignalRService {

    constructor() {
        super("/hubs/pug");
    }

    public onServerUpdate(): Observable<Server> {
        return this.on<Server>("serverUpdate");
    }

    public onServerLog(): Observable<string> {
        return this.on<string>("serverLog");
    }

    public createServer(): Observable<Server> {
        return this.send<Server>("createServer");
    }

    public deleteServer(serverId: string): Observable<boolean> {
        return this.send<boolean>("deleteServer", serverId);
    }
}
