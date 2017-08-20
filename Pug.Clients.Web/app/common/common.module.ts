import { NgModule } from "@angular/core";

import { SignalRService } from "./signalr.service";
import { RequestService } from "./request.service";
import { LocalizationService } from "./localization.service";

@NgModule({
    providers: [SignalRService, RequestService, LocalizationService]
})
export class CommonModule { }
