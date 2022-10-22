import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from "rxjs";

import { PugPhase } from "./pug-phase";
import { PugPhaseStrategyFactory } from "./pug-phase-strategy.factory";
import { IPhaseStrategy } from "./iphase-strategy";

import * as moment from "moment";
import { PickUpGameService } from "../pick-up-game.service";

@Injectable()
export class PhaseService {

    private currentPhaseSubject: ReplaySubject<IPhaseStrategy> = new ReplaySubject<IPhaseStrategy>(1);
    private phaseExpirySubject: ReplaySubject<number> = new ReplaySubject<number>(1);

    private pickUpGameService: PickUpGameService;
    private expiryIntervalId: number;

    constructor(private phaseStrategyFactory: PugPhaseStrategyFactory) { }

    public setPickUpGameService(pickUpGameService: PickUpGameService) {
        this.pickUpGameService = pickUpGameService;
    }

    public setCurrentPhase(phase: PugPhase): void {
        const phaseStrategy: IPhaseStrategy = this.phaseStrategyFactory.make(phase, this.pickUpGameService);

        const expiryTime: moment.Moment = phaseStrategy.getExpiryDateTime();

        const currentTime = moment().utc();

        let phaseDuration: number = expiryTime.diff(currentTime, "seconds");

        if (this.expiryIntervalId) {
            clearInterval(this.expiryIntervalId);
        }

        if (phaseDuration > 0) {
            this.expiryIntervalId = setInterval(() => {
                phaseDuration -= 1;

                this.phaseExpirySubject.next(phaseDuration);

                if (phaseDuration === 0) {
                    clearInterval(this.expiryIntervalId);
                }
            }, 1000) as any;
        }

        this.phaseExpirySubject.next(phaseDuration);

        this.currentPhaseSubject.next(phaseStrategy);
    }

    public get currentPhase(): Observable<IPhaseStrategy> {
        return this.currentPhaseSubject.asObservable();
    }

    public get phaseExpiry(): Observable<number> {
        return this.phaseExpirySubject.asObservable();
    }
}
