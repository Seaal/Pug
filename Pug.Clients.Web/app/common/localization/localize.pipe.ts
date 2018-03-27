import { Pipe, PipeTransform } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";
import { Localization } from "./localization";

@Pipe({
    name: "Localize",
    pure: false
})
export class LocalizePipe extends TranslatePipe implements PipeTransform { 

    public transform(query: string, ...args: any[]): any {
        const localization: Localization = query as any;

        return super.transform(localization.key, localization.data);
    }

}
