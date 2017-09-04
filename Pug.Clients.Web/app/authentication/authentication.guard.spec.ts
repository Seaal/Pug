import { AuthenticationGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationGuard", () => {

    let authenticationGuard: AuthenticationGuard;
    let authenticationService: jasmine.SpyObj<AuthenticationService>;

    beforeEach(() => {
        authenticationService = jasmine.createSpyObj<AuthenticationService>("authenticationService", ["isAuthenticated"]);

        authenticationGuard = new AuthenticationGuard(authenticationService);
    });

    describe("canActivate", () => {

        it("should return true if user is authenticated", () => {
            //Arrange
            authenticationService.isAuthenticated.and.returnValue(true);

            //Act
            const result = authenticationGuard.canActivate();

            //Assert
            expect(result).toBe(true);
        });

        it("should return false if user is not authenticated", () => {
            //Arrange
            authenticationService.isAuthenticated.and.returnValue(false);

            //Act
            const result = authenticationGuard.canActivate();

            //Assert
            expect(result).toBe(false);
        });

    });

});
