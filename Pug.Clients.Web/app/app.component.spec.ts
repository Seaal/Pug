import { ComponentFixture, TestBed, async, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { TranslateService } from "@ngx-translate/core";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {

    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        const translateServiceStub = jasmine.createSpyObj("translateService", ["use"]);

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: TranslateService, useValue: translateServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
        it("should set language default to en-US", inject([TranslateService], (translateService: TranslateService) => {
            fixture.detectChanges();

            expect(translateService.defaultLang).toBe("en-US");
        }));

        it("should use en-US as language", inject([TranslateService], (translateService: TranslateService) => {
            fixture.detectChanges();

            expect(translateService.use).toHaveBeenCalledWith("en-US");
        }));
    });
});
