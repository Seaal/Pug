import { NgModule } from "@angular/core";

import { RequestService } from "./request.service";
import { PersistentStorageService } from "./persistent-storage.service";

@NgModule({
    providers: [
        RequestService,
        PersistentStorageService
    ]
})
export class CommonModule { }
