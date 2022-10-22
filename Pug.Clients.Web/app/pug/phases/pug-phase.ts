import { PugPhaseType } from "./pug-phase-type";
import { PickPlayerPugPhase } from "./pick-player/pick-player-pug-phase";

export interface IPugPhase {
    type: PugPhaseType;
    expiry: Date | string;
}

export type PugPhase =
    PickPlayerPugPhase;
