import { Injectable } from "@angular/core";

@Injectable()
export class PersistentStorageService {

    public get<T>(key: string): T {
        if (!key) {
            throw new Error("Key must be a truthy string value");
        }

        const stringifiedData: string = localStorage.getItem(key);

        return stringifiedData && JSON.parse(stringifiedData);
    }

    public set(key: string, data: any): void {
        if (!key) {
            throw new Error("Key must be a truthy string value");
        }

        const stringifiedData = JSON.stringify(data);

        localStorage.setItem(key, stringifiedData);
    }

    public remove(key: string): void {
        if (!key) {
            throw new Error("Key must be a truthy string value");
        }

        localStorage.removeItem(key);
    }
}
