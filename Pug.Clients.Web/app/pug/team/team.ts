import { Player } from "../player";

export interface Team {
    name: string;
    captain: Player;
    players: Player[];
}
