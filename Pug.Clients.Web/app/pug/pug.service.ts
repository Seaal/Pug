import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { SignalRService } from "../common/signalr.service";
import { Server } from "./server";

@Injectable()
export class PugService {
    constructor(private signalrService: SignalRService) { }

    public initListener(): Observable<Server> {
        return this.signalrService.on<Server>("serverUpdate");
    }

    public logListener(): Observable<string> {
        return this.signalrService.on<string>("serverLog");
    }

    public start(): Observable<void> {
        return this.signalrService.start();
    }

    public createServer(): Observable<Server> {
        return this.signalrService.send<Server>("createServer");
    }

    public deleteServer(serverId: string): Observable<boolean> {
        return this.signalrService.send<boolean>("deleteServer", serverId);
    }
}
