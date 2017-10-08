import { NgModule } from "@angular/core";

import { SignalRService } from "./signalr.service";
import { RequestService } from "./request.service";
import { LocalizationService } from "./localization.service";
import { PersistentStorageService } from "./persistent-storage.service";

@NgModule({
    providers: [
        SignalRService,
        RequestService,
        LocalizationService,
        PersistentStorageService
    ]
})
export class CommonModule { }
