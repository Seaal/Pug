import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Server } from "./server";
import { PugRealTimeService } from "./pug-real-time.service";

@Injectable()
export class PugService {
    constructor(private pugRealTimeService: PugRealTimeService) { }

    public initListener(): Observable<Server> {
        return this.pugRealTimeService.onServerUpdate();
    }

    public logListener(): Observable<string> {
        return this.pugRealTimeService.onServerLog();
    }

    public start(): Observable<void> {
        return this.pugRealTimeService.start();
    }

    public createServer(): Observable<Server> {
        return this.pugRealTimeService.createServer();
    }

    public deleteServer(serverId: string): Observable<boolean> {
        return this.pugRealTimeService.deleteServer(serverId);
    }
}
