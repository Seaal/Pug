import { Component, OnInit } from "@angular/core";
import { Server } from "./server";

@Component({
    templateUrl: "/app/pug/lobby.component.html"
})
export class LobbyComponent implements OnInit {
    public servers: Server[];

    public ngOnInit(): void {
        this.servers = [];
    }
}
