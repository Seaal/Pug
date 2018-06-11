import { PersistentStorageService } from "./persistent-storage.service";

describe("PersistentStorageService", () => {

    let storageService: PersistentStorageService;

    beforeEach(() => {
        storageService = new PersistentStorageService();
    });

    afterEach(() => {
        localStorage.clear();
    });

    const key: string = "key";

    describe("get", () => {

        it("should throw an error when key is empty string", () => {
            expect(() => storageService.get("")).toThrowError("Key must be a truthy string value");
        });

        it("should throw an error when key is null", () => {
            expect(() => storageService.get(null)).toThrowError("Key must be a truthy string value");
        });

        it("should throw an error when key is undefined", () => {
            expect(() => storageService.get(undefined)).toThrowError("Key must be a truthy string value");
        });

        it("should return null when item doesn't exist in localStorage", () => {
            //Act
            const data = storageService.get(key);

            //Assert
            expect(data).toBeNull();
        });

        it("should return a string when localStorage value is a json string", () => {
            //Arrange
            // tslint:disable-next-line:quotemark
            localStorage.setItem(key, '"foobar"');

            //Act
            const data = storageService.get<string>(key);

            //Assert
            expect(data).toBe("foobar");
        });

        it("should return a number when localStorage value is a json number", () => {
            //Arrange
            localStorage.setItem(key, "12345");

            //Act
            const data = storageService.get<number>(key);

            //Assert
            expect(data).toBe(12345);
        });

        it("should return an object when localStorage value is a json object", () => {
            //Arrange
            // tslint:disable-next-line:quotemark
            localStorage.setItem(key, '{"foo": "bar", "baz": 12345 }');

            //Act
            const data = storageService.get<any>(key);

            //Assert
            expect(data).toEqual({ foo: "bar", baz: 12345 });
        });

        it("should return a boolean when localStorage value is a json boolean", () => {
            //Arrange
            localStorage.setItem(key, "true");

            //Act
            const data = storageService.get<boolean>(key);

            //Assert
            expect(data).toBe(true);
        });
    });

    describe("set", () => {

        it("should throw an error when key is empty string", () => {
            expect(() => storageService.set("", null)).toThrowError("Key must be a truthy string value");
        });

        it("should throw an error when key is null", () => {
            expect(() => storageService.set(null, null)).toThrowError("Key must be a truthy string value");
        });

        it("should throw an error when key is undefined", () => {
            expect(() => storageService.set(undefined, null)).toThrowError("Key must be a truthy string value");
        });

        it("should set string to json string in localStorage", () => {
            //Arrange
            const data = "foobar";

            //Act
            storageService.set(key, data);

            //Assert
            // tslint:disable-next-line:quotemark
            expect(localStorage.getItem(key)).toBe('"foobar"');
        });

        it("should set number to json number in localStorage", () => {
            //Arrange
            const data = 12345;

            //Act
            storageService.set(key, data);

            //Assert
            expect(localStorage.getItem(key)).toBe("12345");
        });

        it("should set object to json object in localStorage", () => {
            //Arrange
            const data = { foo: "bar", baz: 12345 };

            //Act
            storageService.set(key, data);

            //Assert
            // tslint:disable-next-line:quotemark
            expect(localStorage.getItem(key)).toBe('{"foo":"bar","baz":12345}');
        });

        it("should set boolean to json boolean in localStorage", () => {
            //Arrange
            const data = true;

            //Act
            storageService.set(key, data);

            //Assert
            expect(localStorage.getItem(key)).toBe("true");
        });

        it("should set null to json null in localStorage", () => {
            //Arrange
            const data: object = null;

            //Act
            storageService.set(key, data);

            //Assert
            expect(localStorage.getItem(key)).toBe("null");
        });
    });

    describe("remove", () => {

        it("should throw an error when key is empty string", () => {
            expect(() => storageService.remove("")).toThrowError("Key must be a truthy string value");
        });

        it("should throw an error when key is null", () => {
            expect(() => storageService.remove(null)).toThrowError("Key must be a truthy string value");
        });

        it("should throw an error when key is undefined", () => {
            expect(() => storageService.remove(undefined)).toThrowError("Key must be a truthy string value");
        });

        it("should remove key value pair from localStorage", () => {
            //Arrange
            localStorage.setItem(key, "foo");

            //Act
            storageService.remove(key);

            //Assert
            expect(localStorage.getItem(key)).toBeNull();
        });
    });
});
