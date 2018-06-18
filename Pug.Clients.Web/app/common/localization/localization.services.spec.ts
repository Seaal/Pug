import { LocalizationService } from "./localization.service";
import { TranslateService } from "@ngx-translate/core";

describe("LocalizationService", () => {

    let localizationService: LocalizationService;
    let translateService: TranslateService;

    beforeEach(() => {
        translateService = jasmine.createSpyObj<TranslateService>("translateService", ["use"]);

        localizationService = new LocalizationService(translateService);
    });

    describe("fallbackLanguage", () => {
        it("should return translateService's defaultLang", () => {
            //Arrange
            translateService.defaultLang = "en-GB";

            //Act
            const fallbackLanguage = localizationService.fallbackLanguage;

            //Assert
            expect(fallbackLanguage).toBe("en-GB");
        });

        it("should set translateService's defaultLang", () => {
            //Arrange
            translateService.defaultLang = null;

            //Act
            localizationService.fallbackLanguage = "en-GB";

            //Assert
            expect(translateService.defaultLang).toBe("en-GB");
        });
    });

    describe("setLanguage", () => {
        it("should call translateService's use", () => {
            //Act
            localizationService.setLanguage("en-GB");

            //Assert
            expect(translateService.use).toHaveBeenCalledWith("en-GB");
        });
    });

});
