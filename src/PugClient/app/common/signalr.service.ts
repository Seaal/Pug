import { Injectable } from "@angular/core";

@Injectable()
export class SignalRService {

    public init(): void {
        console.log("init");
    }

}
