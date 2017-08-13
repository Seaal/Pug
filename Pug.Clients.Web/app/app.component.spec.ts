import { ComponentFixture, TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from "./app.component";
import { LocalizationService } from "./common/localization.service";

describe("AppComponent", () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        const localizationServiceStub = jasmine.createSpyObj("localizationService", ["setLanguage"]);

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: LocalizationService, useValue: localizationServiceStub }
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
