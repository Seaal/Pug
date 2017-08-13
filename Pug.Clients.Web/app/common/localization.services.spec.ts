import { LocalizationService } from "./localization.service";
import { TranslateService } from "@ngx-translate/core";

describe("LocalizationService", () => {

    let localizationService: LocalizationService;
    let translateService: jasmine.SpyObj<TranslateService>;

    beforeEach(() => {
        this.translateService = jasmine.createSpyObj<TranslateService>("translateService", ["use"]);

        this.localizationService = new LocalizationService(this.translateService);
    });

    describe("fallbackLanguage", () => {
        it("should return translateService's defaultLang", () => {
            //Arrange
            this.translateService.defaultLang = "en-GB";

            //Act
            const fallbackLanguage = this.localizationService.fallbackLanguage;

            //Assert
            expect(fallbackLanguage).toBe("en-GB");
        });

        it("should set translateService's defaultLang", () => {
            //Arrange
            this.translateService.defaultLang = null;

            //Act
            this.localizationService.fallbackLanguage = "en-GB";

            //Assert
            expect(this.translateService.defaultLang).toBe("en-GB");
        });
    });

    describe("setLanguage", () => {
        it("should call translateService's use", () => {
            //Act
            this.localizationService.setLanguage("en-GB");

            //Assert
            expect(this.translateService.use).toHaveBeenCalledWith("en-GB");
        });
    });

});
