import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { PickUpGame } from "./pick-up-game";
import { PickUpGameService } from "./pick-up-game.service";

@Injectable()
export class PickUpGameResolver implements Resolve<PickUpGame> {

    constructor(private pugService: PickUpGameService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PickUpGame> {
        return this.pugService.getPug();
    }
}
