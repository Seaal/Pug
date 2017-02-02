import { Component, OnInit } from "@angular/core";
import { Server } from "./server";

@Component({
    templateUrl: "/app/pug/lobby.component.html",
    styleUrls: ["app/pug/lobby.component.css"]
})
export class LobbyComponent implements OnInit {
    public servers: Server[];

    public ngOnInit(): void {
        this.servers = [];
    }

    public createServer(): void {
        this.servers.push({
            id: "1",
            ip: "192.168.0.01:29070",
            players: 0
        });
    }

    public deleteServer(serverId: string): void {
        console.log("delete: " + serverId);
    }
}
