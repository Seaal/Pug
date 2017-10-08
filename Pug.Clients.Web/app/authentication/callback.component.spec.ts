import { CallbackComponent } from "./callback.component";
import { AuthenticationService } from "./authentication.service";

describe("CallbackComponent", () => {

    let callbackComponent: CallbackComponent;
    let authenticationService: jasmine.SpyObj<AuthenticationService>;

    beforeEach(() => {
        authenticationService = jasmine.createSpyObj<AuthenticationService>("authenticationService", ["handleAuthentication"]);

        callbackComponent = new CallbackComponent(authenticationService);
    });

    describe("ngOnInit", () => {
        it("should call handleAuthentication on the authenticationService", () => {
            //Act
            callbackComponent.ngOnInit();

            //Assert
            expect(authenticationService.handleAuthentication).toHaveBeenCalled();
        });
    });
});
