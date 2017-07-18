import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Player } from "./players/player";

@Injectable()
export class PickUpGameService {

    public getPlayers(): Observable<Player[]> {
        return Observable.of([
            { id: "1", name: "Dave" },
            { id: "2", name: "Mercer" },
            { id: "3", name: "Onasi" },
            { id: "4", name: "Alpha"}
        ]);
    }

}
