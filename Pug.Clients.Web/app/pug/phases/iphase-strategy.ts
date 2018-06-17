import { Type } from "@angular/core";

import { PickUpGame } from "../pick-up-game";
import { IBasePugPhaseStrategy } from "./ibase-pug-phase-strategy";
import { Localization } from "../../common/localization";

export interface IPhaseStrategy extends IBasePugPhaseStrategy {
    getPhaseComponent(): Type<any>;
    getPhaseActionMessage(pug: PickUpGame): Localization;
}
