import { Component, Input } from "@angular/core";
import { Team } from "./team";

@Component({
    selector: "pug-team",
    templateUrl: "app/pug/team/team.component.html",
    styleUrls: ["app/pug/team/team.component.css"]
})
export class TeamComponent {

    @Input() public team: Team;

}
