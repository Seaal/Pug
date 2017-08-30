import { InjectionToken } from "@angular/core";

export let AUTHENTICATION_CONFIG = new InjectionToken<AuthenticationConfig>("authentication.config");

export interface AuthenticationConfig {
    clientId: string;
    domain: string;
    responseType: string;
    audience: string;
    redirectUri: string;
    scope: string;
    renewTokenUri: string;
}
