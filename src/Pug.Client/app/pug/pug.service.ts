import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { SignalRService } from "../common/signalr.service";
import { Server } from "./server";

@Injectable()
export class PugService {
    constructor(private signalrService: SignalRService) { }

    public initListener(): Observable<Server> {
        return this.signalrService.on<Server>("pugHub", "serverUpdate");
    }

    public logListener(): Observable<string> {
	    return this.signalrService.on<string>("pugHub", "serverLog");
    }

    public start(): Observable<boolean> {
        return this.signalrService.start();
    }

    public createServer(): Observable<Server> {
        return this.signalrService.send<Server>("pugHub", "createServer");
    }

    public deleteServer(serverId: string): Observable<boolean> {
        return this.signalrService.send<boolean>("pugHub", "deleteServer", serverId);
    }
}
