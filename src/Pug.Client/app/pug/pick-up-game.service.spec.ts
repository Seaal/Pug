import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";

import { PickUpGameService } from "./pick-up-game.service";
import { RequestService } from "../common/request.service";
import { PhaseService } from "./phases/phase.service";

describe("PickUpGameService", () => {

    let pugService: PickUpGameService;
    let requestService: RequestService;
    let phaseService: PhaseService;

    beforeEach(() => {
        requestService = jasmine.createSpyObj("requestService", ["get"]);
        phaseService = jasmine.createSpyObj("phaseService", ["setCurrentPhase"]);

        pugService = new PickUpGameService(requestService, phaseService);
    });

    describe("getPug", () => {
        beforeEach(() => {
            (<jasmine.Spy>requestService.get).and.returnValue(Observable.of({
                id: 17,
                currentPhase: {
                    type: 1,
                    expires: "12345"
                }
            }));
        });

        it("should return pug object from requestService", () => {
            //Act
            pugService.getPug().subscribe((pug) =>
                //Assert
                expect(pug.id).toEqual(17)
            );
        });

        it("should set currentPhase to pug's current phase", () => {
            //Act
            pugService.getPug().subscribe();

            //Assert
            expect(phaseService.setCurrentPhase).toHaveBeenCalledWith({
                type: 1,
                expires: "12345"
            });
        });
    });

});
