import { ComponentFixture, TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";

import { AppComponent } from "./app.component";
import { LocalizationService } from "./common/localization.service";
import { AuthenticationService } from "./authentication/authentication.service";
import { User } from "./authentication/user";

describe("AppComponent", () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    let localizationService: jasmine.SpyObj<LocalizationService>;
    let authenticationService: jasmine.SpyObj<AuthenticationService>;

    beforeEach(async(() => {
        const localizationServiceSpy = jasmine.createSpyObj("localizationService", ["setLanguage"]);
        const authenticationServiceSpy = jasmine.createSpyObj<AuthenticationService>("authenticationService", ["isAuthenticated", "initAuthentication", "profile"]);

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

        localizationService = TestBed.get(LocalizationService);
        authenticationService = TestBed.get(AuthenticationService);

        const user: User = {
            id: "foo",
            nickname: "bar"
        };

        authenticationService.profile.and.returnValue(Observable.of(user));
    });

    describe("ngOnInit", () => {
        it("should set localization fallback language to en-US", () => {
            //Act
            fixture.detectChanges();

            //Assert
            expect(localizationService.fallbackLanguage).toBe("en-US");
        });

        it("should use en-US as localization language", () => {
            //Act
            fixture.detectChanges();

            //Assert
            expect(localizationService.setLanguage).toHaveBeenCalledWith("en-US");
        });

        it("should init authentication service", () => {
            //Act
            fixture.detectChanges();

            //Assert
            expect(authenticationService.initAuthentication).toHaveBeenCalled();
        });

        it("should update nickname from user profile", () => {
            //Act
            fixture.detectChanges();

            //Assert
            expect(component.nickname).toBe("bar");
        });

        it("when users profile is null should set nickname to empty string", () => {
            //Arrange
            authenticationService.profile.and.returnValue(Observable.of(null));

            //Act
            fixture.detectChanges();

            //Assert
            expect(component.nickname).toBe("");
        });
    });
});
