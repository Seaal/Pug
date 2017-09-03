import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/timer";
import "rxjs/add/observable/throw";

import { AuthenticationService } from "./authentication.service";
import { PersistentStorageService } from "../common/persistent-storage.service";
import { AuthenticationConfig } from "./authentication-config";
import { IAuthenticationProvider } from "./iauthentication.provider";
import { User } from "./user";
import { AuthenticationResult } from "./authentication-result";

describe("AuthenticationService", () => {

    let authenticationService: AuthenticationService;
    let storageService: jasmine.SpyObj<PersistentStorageService>;
    let authenticationProvider: jasmine.SpyObj<IAuthenticationProvider>;
    let router: jasmine.SpyObj<Router>;

    let user: User;
    let authResult: AuthenticationResult;

    beforeEach(() => {
        storageService = jasmine.createSpyObj<PersistentStorageService>("persistentStorageService", ["get", "set", "remove"]);
        authenticationProvider = jasmine.createSpyObj<IAuthenticationProvider>("authenticationProvider", ["renewToken", "getUserProfile", "displayLogin", "handleAuthentication"]);
        router = jasmine.createSpyObj<Router>("router", ["navigateByUrl"]);

        authenticationService = new AuthenticationService(router, storageService, authenticationProvider);
    });

    beforeEach(() => {
        user = {
            id: "id",
            nickname: "Foo"
        };

        authResult = {
            accessToken: "access",
            expiresIn: 2,
            idToken: "id"
        };

        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(1000));

        authenticationProvider.getUserProfile.and.returnValue(Observable.of(user));
    });

    //Fixes jasmine clock not working in Angular Zone
    beforeAll(() => {
        jasmine.clock().uninstall();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    describe("initAuthentication", () => {

        beforeEach(() => {
            authenticationProvider.renewToken.and.returnValue(Observable.of(authResult));
        });

        describe("when user was not previously logged in", () => {

            beforeEach(() => {
                storageService.get.and.returnValue(null);
            });

            it("should not renew token if expiresAt is null", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationProvider.renewToken).not.toHaveBeenCalled();
            });

            it("should not update user profile", () => {
                //Arrange
                let currentUser: User;

                authenticationService.profile().subscribe(u => currentUser = u);

                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(currentUser).toBeUndefined();
            });

            it("should return isAuthenticated as false", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationService.isAuthenticated()).toBe(false);
            });
        });

        describe("when user was previously logged in, but their token expired", () => {
            beforeEach(() => {
                storageService.get.and.returnValue(1000);
            });

            it("should renew the users token", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationProvider.renewToken).toHaveBeenCalled();
            });

            it("when renewToken fails should log error", () => {
                //Arrange
                spyOn(console, "log");

                const error = "errorMessage";

                authenticationProvider.renewToken.and.returnValue(Observable.throw(error));

                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(console.log).toHaveBeenCalledWith(error);
            });

            it("should update user profile", () => {
                //Arrange
                let currentUser: User;

                authenticationService.profile().subscribe(u => currentUser = u);

                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(currentUser).toBe(user);
            });

            it("should return isAuthenticated as true", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationService.isAuthenticated()).toBe(true);
            });

            it("should return new accessToken", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationService.getAccessToken()).toBe(authResult.accessToken);
            });

            it("should update stored accessToken", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(storageService.set).toHaveBeenCalledWith("auth_access_token", "access");
            });

            it("should update stored idToken", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(storageService.set).toHaveBeenCalledWith("auth_id_token", "id");
            });

            it("should update stored expiresAt", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(storageService.set).toHaveBeenCalledWith("auth_expires_at", 3000);
            });

            it("should renew token after it expires", () => {
                //Act
                authenticationService.initAuthentication();

                jasmine.clock().tick(2000);

                //Assert
                expect(authenticationProvider.renewToken).toHaveBeenCalledTimes(2);
            });
        });

        describe("when user was previously logged in and their token is still valid", () => {
            beforeEach(() => {
                storageService.get.and.returnValues(1001, "access-alreadyLogged", "idToken");
            });

            it("should not renew the users token", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationProvider.renewToken).not.toHaveBeenCalled();
            });

            it("should update the users profile", () => {
                //Arrange
                let currentUser: User;

                authenticationService.profile().subscribe(u => currentUser = u);

                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(currentUser).toBe(user);
            });

            it("should return isAuthenticated as true", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationService.isAuthenticated()).toBe(true);
            });

            it("should return the correct access token", () => {
                //Act
                authenticationService.initAuthentication();

                //Assert
                expect(authenticationService.getAccessToken()).toBe("access-alreadyLogged");
            });

            it("should renew token after it expires", () => {
                //Act
                authenticationService.initAuthentication();

                jasmine.clock().tick(2000);

                //Assert
                expect(authenticationProvider.renewToken).toHaveBeenCalled();
            });
        });
    });

    describe("login", () => {
        beforeEach(() => {
            (router as any).url = "foo/bar";
        });

        it("should save the current url in persistent storage", () => {
            //Act
            authenticationService.login();

            //Assert
            expect(storageService.set).toHaveBeenCalledWith("auth_redirect_url", "foo/bar");
        });

        it("should display the login screen to the user", () => {
            //Act
            authenticationService.login();

            //Assert
            expect(authenticationProvider.displayLogin).toHaveBeenCalled();
        });
    });

    describe("logout", () => {

        it("should remove access token from persistent storage", () => {
            //Act
            authenticationService.logout();

            //Assert
            expect(storageService.remove).toHaveBeenCalledWith("auth_access_token");
        });

        it("should remove id token from persistent storage", () => {
            //Act
            authenticationService.logout();

            //Assert
            expect(storageService.remove).toHaveBeenCalledWith("auth_id_token");
        });

        it("should remove expires at from persistent storage", () => {
            //Act
            authenticationService.logout();

            //Assert
            expect(storageService.remove).toHaveBeenCalledWith("auth_expires_at");
        });

        it("should return isAuthenticated as false", () => {
            //Act
            authenticationService.logout();

            //Assert
            expect(authenticationService.isAuthenticated()).toBe(false);
        });

        it("should update the users profile to null", () => {
            //Arrange
            let currentUser = user;

            authenticationService.profile().subscribe(u => currentUser = u);

            //Act
            authenticationService.logout();

            //Assert
            expect(currentUser).toBeNull();
        });

        it("should not renew the token after it expires", () => {
            //Arrange
            storageService.get.and.returnValues(1001, "access-alreadyLogged", "idToken");

            authenticationService.initAuthentication();

            //Act
            authenticationService.logout();

            jasmine.clock().tick(2);

            //Assert
            expect(authenticationProvider.renewToken).not.toHaveBeenCalled();
        });
    });

    describe("handleAuthentication", () => {
        beforeEach(() => {
            authenticationProvider.handleAuthentication.and.returnValue(Observable.of(authResult));
        });

        it("when redirect is set, should redirect to the url", () => {
            //Arrange
            storageService.get.and.returnValue("foo/bar");

            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(router.navigateByUrl).toHaveBeenCalledWith("foo/bar");
        });

        it("should remove redirect url from persistent storage", () => {
            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(storageService.remove).toHaveBeenCalledWith("auth_redirect_url");
        });

        it("when redirect is not set, should redirect to the default redirect url", () => {
            //Arrange
            authenticationService.defaultLoginRedirectUrl = "default";

            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(router.navigateByUrl).toHaveBeenCalledWith("default");
        });

        it("when redirect is not set and default redirect url is not set, should redirect to the empty route", () => {
            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(router.navigateByUrl).toHaveBeenCalledWith("");
        });

        it("should update the users profile", () => {
            //Arrange
            let currentUser: User;

            authenticationService.profile().subscribe(u => currentUser = u);

            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(currentUser).toBe(user);
        });

        it("should return true for isAuthenticated", () => {
            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(authenticationService.isAuthenticated()).toBe(true);
        });

        it("should return correct access token", () => {
            //Act
            authenticationService.handleAuthentication();

            //Assert
            expect(authenticationService.getAccessToken()).toBe("access");
        });

        it("should renew token when it expires", () => {
            //Arrange
            authenticationProvider.renewToken.and.returnValue(Observable.of(authResult));

            //Act
            authenticationService.handleAuthentication();

            jasmine.clock().tick(2000);

            //Assert
            expect(authenticationProvider.renewToken).toHaveBeenCalled();
        });

        describe("when handleAuthentication errors", () => {
            beforeEach(() => {
                authenticationProvider.handleAuthentication.and.returnValue(Observable.throw("error"));
            });

            it("should redirect to default redirect url", () => {
                //Arrange
                authenticationService.defaultLoginRedirectUrl = "default";

                //Act
                authenticationService.handleAuthentication();

                //Assert
                expect(router.navigateByUrl).toHaveBeenCalledWith("default");
            });

            it("when default redirect url is not set, should redirect to the empty route", () => {
                //Act
                authenticationService.handleAuthentication();

                //Assert
                expect(router.navigateByUrl).toHaveBeenCalledWith("");
            });
        });
    });
});
