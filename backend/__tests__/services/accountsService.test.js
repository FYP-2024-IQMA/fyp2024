const accountsService = require("../../dist/services/accountsService");
const supabase = require("../../dist/config/supabaseConfig");
const accountsModel = require("../../dist/models/accountsModel");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

describe("createAccount", () => {
    const mockData = [
        {
            userID: "1",
            firstName: "Mary",
            lastName: "Brown",
            email: "mary.brown@example.com",
            role: "learner",
            age: "Millennials (25-40)",
            gender: "Female",
            hasOnboarded: "false",
        },
    ];

    const expectedResult = mockData.map((data) => ({
        ...data,
        dateCreated: expect.anything(),
    }));

    it("create & returns learner account", async () => {
        const mockSelect = jest
            .fn()
            .mockResolvedValue({ data: expectedResult, error: null });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });
        supabase.from.mockReturnValue({ insert: mockInsert });

        const accounts = await accountsService.createAccount(mockData[0]);

        expect(mockInsert).toHaveBeenCalledWith(mockData[0]);
        expect(accounts).toEqual(expectedResult);
    });

    it("create & returns admin account", async () => {
        mockData[0].role = "admin";
        expectedResult[0].role = "admin";

        const mockSelect = jest
            .fn()
            .mockResolvedValue({ data: expectedResult, error: null });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });
        supabase.from.mockReturnValue({ insert: mockInsert });

        const accounts = await accountsService.createAccount(mockData[0]);

        expect(mockInsert).toHaveBeenCalledWith(mockData[0]);
        expect(accounts).toEqual(expectedResult);
    });

    it("handles error correctly and logs it to console.error", async () => {
        const errorMessage = "Failed to fetch all accounts";

        const mockSelect = jest
            .fn()
            .mockResolvedValue({
                data: expectedResult,
                error: new Error(errorMessage),
            });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(
            accountsService.createAccount(mockData[0])
        ).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getAllAccounts", () => {
    const expectedResult = [
        {
            userID: "1",
            firstName: "Mary",
            lastName: "Brown",
            email: "mary.brown@example.com",
            role: "admin",
            age: "Millennials (25-40)",
            gender: "Female",
            dateCreated: "2024-07-13T16:11:18.442052+00:00",
            hasOnboarded: "false",
        },
    ];

    it("calls supabase.from with 'accounts'", async () => {
        const mockSelect = jest
            .fn()
            .mockResolvedValue({ data: expectedResult, error: null });

        supabase.from.mockReturnValue({ select: mockSelect });

        await accountsService.getAllAccounts();
        expect(supabase.from).toHaveBeenCalledWith("accounts");
    });

    it("returns all accounts", async () => {
        const mockSelect = jest
            .fn()
            .mockResolvedValue({ data: expectedResult, error: null });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await accountsService.getAllAccounts();
        expect(accounts).toEqual(expectedResult);
    });

    it("handles error correctly and logs it to console.error", async () => {
        const errorMessage = "Failed to fetch all accounts";

        const mockSelect = jest
            .fn()
            .mockResolvedValue({ data: null, error: new Error(errorMessage) });

        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(accountsService.getAllAccounts()).rejects.toThrow(
            errorMessage
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getAccountById", () => {
    const mockData = {
        userID: "123",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        role: "learner",
        age: "Millennials (25-40)",
        gender: "Female",
        dateCreated: "2024-07-23T13:48:04.443245+00:00",
        hasOnboarded: "false",
    };

    const expectedResult = {
        ...mockData,
        dateCreated: new Date(mockData.dateCreated),
    };

    it("should return a Learner object when the user is a learner", async () => {
        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsService.getAccountById(mockData.userID);

        expect(result).toBeInstanceOf(accountsModel.Learner);
        expect(result).toEqual(expectedResult);
    });

    it("should return an Admin object when the user is an admin", async () => {
        mockData.role = "admin";
        expectedResult.role = "admin";

        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsService.getAccountById(mockData.userID);

        expect(result).toBeInstanceOf(accountsModel.Admin);
        expect(result).toEqual(expectedResult);
    });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch account";

        const mockSingle = jest
            .fn()
            .mockResolvedValue({
                data: mockData,
                error: new Error(errorMessage),
            });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(accountsService.getAccountById("789")).rejects.toThrow(
            errorMessage
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getAccountsByRole", () => {
    const mockData = [
        {
            userID: "123",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            role: "admin",
            dateCreated: "2023-01-01T00:00:00.000Z",
            age: "twenty",
            gender: "male",
            hasOnboarded: "false"
        },
        {
            userID: "456",
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            role: "admin",
            dateCreated: "2023-02-01T00:00:00.000Z",
            age: "thirty",
            gender: "female",
            hasOnboarded: "false"
        },
    ];

    it("should return an array of admin accounts when there is no error", async () => {
        const mockEq = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsService.getAccountsByRole("admin");

        expect(result).toEqual(mockData);
    });

    it("should return an array of learner accounts when there is no error", async () => {
        mockData[0].role = "learner";
        mockData[1].role = "learner";

        const mockEq = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsService.getAccountsByRole("learner");

        expect(result).toEqual(mockData);
    });

    it("should throw an error and log the error when there is an error from the database", async () => {
        const errorMessage = "Failed to fetch admin accounts";

        const mockEq = jest
            .fn()
            .mockResolvedValue({ data: null, error: new Error(errorMessage) });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            accountsService.getAccountsByRole("admin")
        ).rejects.toThrow(errorMessage);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("updateAccount", () => {
    const mockAccount = {
        userID: "123",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
    };

    it("should update the account successfully when valid fields are provided", async () => {
        const mockEq = jest
            .fn()
            .mockResolvedValue({
                status: 204,
                statusText: "No Content",
                error: null,
            });
        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ update: mockUpdate });

        const result = await accountsService.updateAccount(mockAccount);

        expect(supabase.from).toHaveBeenCalledWith("accounts");
        expect(mockEq).toHaveBeenCalledWith("userID", mockAccount.userID);
        expect(mockUpdate).toHaveBeenCalledWith({
            firstName: mockAccount.firstName,
            lastName: mockAccount.lastName,
            email: mockAccount.email,
        });
        expect(result).toEqual({ status: 204, statusText: "No Content" });
    });

    it("should throw an error when no fields are provided to update", async () => {
        const mockAccount = {
            userID: "123",
        };

        await expect(
            accountsService.updateAccount(mockAccount)
        ).rejects.toThrow("No fields to update");
    });

    it("should throw an error and log the error when there is a database error", async () => {
        const errorMessage = "Database error";

        const mockEq = jest
            .fn()
            .mockResolvedValue({
                status: null,
                statusText: null,
                error: new Error(errorMessage),
            });
        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ update: mockUpdate });

        await expect(
            accountsService.updateAccount(mockAccount)
        ).rejects.toThrow(errorMessage);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("deleteAccount", () => {
    const userID = "123";

    it("should delete the account successfully", async () => {
        const mockEq = jest
            .fn()
            .mockResolvedValue({
                status: 204,
                statusText: "No Content",
                error: null,
            });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete });

        const result = await accountsService.deleteAccount(userID);

        expect(supabase.from).toHaveBeenCalledWith("accounts");
        expect(mockEq).toHaveBeenCalledWith("userID", userID);
        expect(result).toEqual({ status: 204, statusText: "No Content" });
    });

    it("should throw an error and log the error when there is a database error", async () => {
        const errorMessage = "Database error";

        const mockEq = jest
            .fn()
            .mockResolvedValue({
                status: null,
                statusText: null,
                error: new Error(errorMessage),
            });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(accountsService.deleteAccount(userID)).rejects.toThrow(
            errorMessage
        );
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});
