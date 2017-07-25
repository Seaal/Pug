import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[phase-host]"
})
export class PhaseHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
