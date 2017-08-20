import { PugPhaseType } from "./pug-phase-type";

export interface PugPhase {
    type: PugPhaseType;
    expiry: Date | string;
}
