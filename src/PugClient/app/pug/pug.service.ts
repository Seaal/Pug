﻿import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { SignalRService } from "../common/signalr.service";
import { Server } from "./server";

@Injectable()
export class PugService {
    constructor(private signalrService: SignalRService) { }

    public initListener(): Observable<Server> {
        return this.signalrService.on<Server>("pugHub", "serverUpdate");
    }

    public start(): Observable<boolean> {
        return this.signalrService.start();
    }

    public createServer(): Observable<Server> {
        return this.signalrService.send<Server, null>("pugHub", "createServer", null);
    }
}
