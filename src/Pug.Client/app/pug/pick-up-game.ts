import { Player } from "./players/player";
import { PugPhase } from "./phases/pug-phase";
import { Team } from "./team/team";

export interface PickUpGame {
    pickablePlayers: Player[];
    currentPhase: PugPhase;
    teams: Team[];
}
