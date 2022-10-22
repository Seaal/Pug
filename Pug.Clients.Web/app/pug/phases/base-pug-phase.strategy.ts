import { IPugPhase } from "./pug-phase";
import { IBasePugPhaseStrategy } from "./ibase-pug-phase-strategy";

import * as moment from "moment";
import { PickUpGameService } from "../pick-up-game.service";

export abstract class BasePugPhaseStrategy<T extends IPugPhase> implements IBasePugPhaseStrategy {

    constructor(protected readonly phase: T,
                protected readonly pickUpGameService: PickUpGameService) { }

    public getExpiryDateTime(): moment.Moment {
        return moment(this.phase.expiry);
    }

}
