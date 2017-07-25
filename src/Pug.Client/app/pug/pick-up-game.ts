import { Player } from "./player";
import { PugPhase } from "./phases/pug-phase";
import { Team } from "./team/team";

export interface PickUpGame {
    id: number;
    path: string[];
    pickablePlayers: Player[];
    currentPhase: PugPhase;
    teams: Team[];
}
