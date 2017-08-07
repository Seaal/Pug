import { NgModule } from "@angular/core";

import { SignalRService } from "./signalr.service";
import { RequestService } from "./request.service";

@NgModule({
    providers: [SignalRService, RequestService]
})
export class CommonModule { }
