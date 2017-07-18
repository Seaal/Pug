import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { PugPhase } from "./pug-phase";
import { PugPhaseFactory } from "./pug-phase.factory";
import { IPhaseStrategy } from "./iphase-strategy";

@Injectable()
export class PhaseService {

    private currentPhaseSubject: Subject<IPhaseStrategy> = new Subject<IPhaseStrategy>();

    constructor(private phaseStrategyFactory: PugPhaseFactory) { }

    public setCurrentPhase(phase: PugPhase): void {
        this.currentPhaseSubject.next(this.phaseStrategyFactory.make(phase));
    };

    public get currentPhase(): Observable<IPhaseStrategy> {
        return this.currentPhaseSubject.asObservable();
    };
}
