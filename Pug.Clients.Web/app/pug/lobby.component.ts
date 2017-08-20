import { Component, OnInit } from "@angular/core";

import { Server } from "./server";
import { PugService } from "./pug.service";

@Component({
    moduleId: module.id,
    templateUrl: "lobby.component.html",
    styleUrls: ["lobby.component.css"]
})
export class LobbyComponent implements OnInit {
    public servers: Server[];
    public serverLogs: string[];

    constructor(private pugService: PugService) { }

	public ngOnInit(): void {
        this.servers = [];
        this.serverLogs = [];

        this.pugService.initListener().subscribe(
            server => this.servers.push(server)
        );

        this.pugService.logListener().subscribe(
            log => this.serverLogs.push(log)
        );

        this.pugService.start();
    }

    public createServer(): void {
        this.pugService.createServer().subscribe(
            server => this.servers.push(server)
        );
    }

    public deleteServer(serverId: string): void {
        this.pugService.deleteServer(serverId).subscribe(
            success => this.servers = this.servers.filter(server => server.id !== serverId)
        );
    }
}
