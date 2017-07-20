import { Player } from "../players/player";

export interface Team {
    name: string;
    captain: Player;
    players: Player[];
}
