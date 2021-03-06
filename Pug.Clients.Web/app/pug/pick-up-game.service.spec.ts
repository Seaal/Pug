﻿import { of } from "rxjs";

import { PickUpGameService } from "./pick-up-game.service";
import { RequestService } from "../common/request.service";
import { PhaseService } from "./phases/phase.service";

describe("PickUpGameService", () => {

    let pugService: PickUpGameService;
    let requestService: jasmine.SpyObj<RequestService>;
    let phaseService: PhaseService;

    beforeEach(() => {
        requestService = jasmine.createSpyObj<RequestService>("requestService", ["get"]);
        phaseService = jasmine.createSpyObj("phaseService", ["setCurrentPhase"]);

        pugService = new PickUpGameService(requestService, phaseService);
    });

    describe("getPug", () => {
        beforeEach(() => {
            requestService.get.and.returnValue(of({
                id: 17,
                currentPhase: {
                    type: 1,
                    expires: "12345"
                }
            }));
        });

        it("should return pug object from requestService", () => {
            //Act
            pugService.getPug().subscribe(pug =>
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
