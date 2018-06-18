import { NgModule } from "@angular/core";

import { SignalRService } from "./signalr.service";
import { RequestService } from "./request.service";
import { PersistentStorageService } from "./persistent-storage.service";

@NgModule({
    providers: [
        SignalRService,
        RequestService,
        PersistentStorageService
    ]
})
export class CommonModule { }
