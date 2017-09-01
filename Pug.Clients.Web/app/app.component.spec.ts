import { ComponentFixture, TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";

import { AppComponent } from "./app.component";
import { LocalizationService } from "./common/localization.service";
import { AuthenticationService } from "./authentication/authentication.service";

describe("AppComponent", () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        const localizationServiceSpy = jasmine.createSpyObj("localizationService", ["setLanguage"]);
        const authenticationServiceSpy = jasmine.createSpyObj<AuthenticationService>("authenticationService", ["isAuthenticated", "initAuthentication", "profile"]);

        authenticationServiceSpy.profile.and.returnValue(Observable.empty());

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: LocalizationService, useValue: localizationServiceSpy },
                { provide: AuthenticationService, useValue: authenticationServiceSpy }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
        it("should set fallback language to en-US", inject([LocalizationService], (localizationService: LocalizationService) => {
            fixture.detectChanges();

            expect(localizationService.fallbackLanguage).toBe("en-US");
        }));

        it("should use en-US as language", inject([LocalizationService], (localizationService: LocalizationService) => {
            fixture.detectChanges();

            expect(localizationService.setLanguage).toHaveBeenCalledWith("en-US");
        }));
    });
});
