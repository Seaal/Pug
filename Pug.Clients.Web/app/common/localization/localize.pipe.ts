import { Pipe, PipeTransform } from "@angular/core";

import { TranslatePipe } from "@ngx-translate/core";

@Pipe({
    name: "localize",
    pure: false
})
export class LocalizePipe extends TranslatePipe implements PipeTransform {

    public transform(query: string, ...args: any[]): any {
        return super.transform(query, ...args);
    }

}
