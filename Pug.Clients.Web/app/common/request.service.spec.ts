import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { RequestService } from "./request.service";
import { AppConfig, APP_CONFIG } from "../app-config";
import { AuthenticationService } from "../authentication/authentication.service";

describe("RequestService", () => {

    beforeEach(() => {
        const appConfig: AppConfig = {
            apiEndpoint: "/api/"
        };

        const authenticationServiceSpy: jasmine.SpyObj<AuthenticationService> = jasmine.createSpyObj<AuthenticationService>("authenticationService", ["getAccessToken"]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RequestService,
                { provide: AuthenticationService, useValue: authenticationServiceSpy },
                { provide: APP_CONFIG, useValue: appConfig }
            ]
        });
    });

    describe("get", () => {
        it("should prepend url with apiEndpoint from AppConfig", inject([RequestService, HttpTestingController], (requestService: RequestService, httpMock: HttpTestingController) => {
            //Act
            requestService.get("test").subscribe();

            //Assert
            httpMock.expectOne("/api/test");
        }));

        it("should call HttpClient get and return its observable", inject([RequestService, HttpTestingController], (requestService: RequestService, httpMock: HttpTestingController) => {
            //Act
            requestService.get("test").subscribe(result =>
                //Assert
                expect(result).toEqual("returnValue")
            );

            const testRequest = httpMock.expectOne("/api/test");

            expect(testRequest.request.method).toEqual("GET");

            testRequest.flush("returnValue");
        }));
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));
});
