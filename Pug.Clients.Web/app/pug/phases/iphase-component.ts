import { PickUpGame } from "../pick-up-game";
import { IPhaseStrategy } from "./iphase-strategy";

export interface IPhaseComponent {
    pug: PickUpGame;
    phaseStrategy: IPhaseStrategy;
}
