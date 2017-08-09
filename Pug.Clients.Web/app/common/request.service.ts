import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { AppConfig, APP_CONFIG } from "../app-config";

@Injectable()
export class RequestService {

    private readonly apiEndpoint: string;

    constructor(private httpClient: HttpClient,
                @Inject(APP_CONFIG) config: AppConfig) {
        this.apiEndpoint = config.apiEndpoint;
    }

    public get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(this.apiEndpoint + url);
    }
}
