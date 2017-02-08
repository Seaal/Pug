import { Component, OnInit } from "@angular/core";

import { Server } from "./server";
import { PugService } from "./pug.service";

@Component({
    templateUrl: "/app/pug/lobby.component.html",
    styleUrls: ["app/pug/lobby.component.css"]
})
export class LobbyComponent implements OnInit {
    public servers: Server[];

    constructor(private pugService: PugService) { }

    public ngOnInit(): void {
        this.servers = [];

        this.pugService.initListener().subscribe(
            (server) => this.servers.push(server)
        );
        this.pugService.start();
    }

    public createServer(): void {
        this.pugService.createServer().subscribe(
            (server) => this.servers.push(server)
        );
    }

    public deleteServer(serverId: string): void {
        console.log("delete: " + serverId);
    }
}
