import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root"
})
export class LocalizationService {

    constructor(private translateService: TranslateService) { }

    public set fallbackLanguage(language: string) {
        this.translateService.defaultLang = language;
    }

    public get fallbackLanguage(): string {
        return this.translateService.defaultLang;
    }

    public setLanguage(language: string) {
        this.translateService.use(language);
    }
}
