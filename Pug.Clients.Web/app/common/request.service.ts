import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { AppConfig, APP_CONFIG } from "../app-config";
import { AuthenticationService } from "../authentication/authentication.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class RequestService {

    private readonly apiEndpoint: string;

    constructor(private httpClient: HttpClient,
                private authenticationService: AuthenticationService,
                @Inject(APP_CONFIG) config: AppConfig) {
        this.apiEndpoint = config.apiEndpoint;
    }

    public get<T>(url: string): Observable<T> {
        const options = this.setOptions();

        return this.httpClient.get<T>(this.apiEndpoint + url, options);
    }

    private setOptions() {
        const token: string = this.authenticationService.getAccessToken();

        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        return {
            headers
        };
    }
}
