import { PugPhase } from "./pug-phase";
import { IBasePugPhaseStrategy } from "./ibase-pug-phase-strategy";

export abstract class BasePugPhaseStrategy<T extends PugPhase> implements IBasePugPhaseStrategy {

    constructor(protected phase: T) { }

    public getExpiryDateTime(): moment.Moment {
        return moment(this.phase.expiry);
    }

}
