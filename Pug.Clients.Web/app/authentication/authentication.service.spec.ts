import { AuthenticationService } from "./authentication.service";
import { PersistentStorageService } from "../common/persistent-storage.service";
import { AuthenticationConfig } from "./authentication-config";

describe("AuthenticationService", () => {

    let authenticationService: AuthenticationService;
    let storageService: jasmine.SpyObj<PersistentStorageService>;

    beforeEach(() => {
        storageService = jasmine.createSpyObj<PersistentStorageService>("persistentStorageService", ["get", "set", "remove"]);

        authenticationService = new AuthenticationService(null, storageService, null);
    });

    describe("initAuthentication", () => {

        xit("should not renew token if expiresAt is null", () => {
            //Arrange
            storageService.get.and.returnValue(null);

            //Act
            authenticationService.initAuthentication();

            //Assert
            //TODO
        });

    });

});
