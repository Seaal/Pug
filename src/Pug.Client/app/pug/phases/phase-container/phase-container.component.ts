import { Component, Input, OnInit, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { PickUpGame } from "../../pick-up-game";
import { PhaseService } from "../phase.service";
import { IPhaseStrategy } from "../iphase-strategy";
import { PhaseHostDirective } from "./phase-host.directive";
import { IPhaseComponent } from "../iphase-component";

@Component({
    selector: "pug-phase-container",
    templateUrl: "app/pug/phases/phase-container/phase-container.component.html"
})
export class PhaseContainerComponent implements OnInit {

    @Input() public pug: PickUpGame;
    @ViewChild(PhaseHostDirective) public phaseHost: PhaseHostDirective;

    private currentPhaseStrategy: IPhaseStrategy;

    constructor(private phaseService: PhaseService,
                private componentFactoryResolver: ComponentFactoryResolver) { }

    public ngOnInit() {
        this.phaseService.currentPhase.subscribe((phaseStrategy) => {
            this.currentPhaseStrategy = phaseStrategy;
            this.loadPhase();
        });
    }

    private loadPhase(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentPhaseStrategy.getPhaseComponent());

        const viewContainerRef = this.phaseHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);

        (<IPhaseComponent>componentRef.instance).pug = this.pug;
    }
}
