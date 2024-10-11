const accountsGamificationService = require("../../dist/services/accountsGamificationService");
const supabase = require("../../dist/config/supabaseConfig");
const accountsGamificationModel = require("../../dist/models/accountsGamificationModel");

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

describe("getTop5Accounts", () => {

    userID = "2";

    const mockResult = [
        {
            points: 150,
            accounts: {
                userID: "1",
                lastName: "USER",
                firstName: "test",
            },
        },
        {
            points: 100,
            accounts: {
                userID: "3",
                lastName: "3",
                firstName: "test",
            },
        },
        {
            points: 80,
            accounts: {
                userID: "8",
                lastName: "4",
                firstName: "test",
            },
        },
        {
            points: 50,
            accounts: {
                userID: "2",
                lastName: "5",
                firstName: "test",
            },
        },
        {
            points: 20,
            accounts: {
                userID: "5",
                lastName: "6",
                firstName: "test",
            },
        },
        {
            points: 0,
            accounts: {
                userID: "1041",
                lastName: "Smith",
                firstName: "LEARN",
            },
        },
        {
            points: 0,
            accounts: {
                userID: "jd",
                lastName: "Doe",
                firstName: "John"
            },
        },
    ];

    const expectedResult = [
        {
            rank: 1,
            name: "test USER",
            points: 150,
        },
        {
            rank: 2,
            name: "test 3",
            points: 100,
        },
        {
            rank: 3,
            name: "test 4",
            points: 80,
        },
        {
            rank: 4,
            name: "test 5",
            points: 50,
        },
        {
            rank: 5,
            name: "test 6",
            points: 20,
        },
    ];

    it("returns accounts ranked top 5 & user rank", async () => {

        const mockOrder = jest.fn().mockReturnValue({ data: mockResult, error: null });

        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await accountsGamificationService.getTop5Accounts(userID);
        expect(accounts).toEqual(expectedResult);
    });

    it("returns accounts ranked top 5 & user rank if user is not within top 5", async () => {
        const userID = "jd";

        const mockOrder = jest
            .fn()
            .mockReturnValue({ data: mockResult, error: null });

        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await accountsGamificationService.getTop5Accounts(
            userID
        );

        expect(accounts).toEqual([
            ...expectedResult,
            {
                rank: 6,
                name: "John Doe",
                points: 0,
            },
        ]);
    });

    it("returns more than 5 accounts if there is any same rank & user rank", async () => {

        const mockResult2 = [
            ...mockResult,
            {
                points: 20,
                accounts: {
                    userID: "mockPair",
                    lastName: "pair",
                    firstName: "mock",
                },
            },
        ];

        mockResult2.sort((a, b) => b.points - a.points);

        const mockOrder = jest
            .fn()
            .mockReturnValue({ data: mockResult2, error: null });

        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await accountsGamificationService.getTop5Accounts(
            userID
        );

        expect(accounts).toEqual([
            ...expectedResult,
            {
                rank: 5,
                name: "mock pair",
                points: 20,
            },
        ]);
    });

    it("handles error correctly and logs it to console.error", async () => {
        const errorMessage = "Failed to fetch all accounts";

        const mockOrder = jest.fn().mockResolvedValue({ data: null, error: new Error(errorMessage) });

        const mockSelect = jest
            .fn()
            .mockReturnValue({ order: mockOrder });

        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            accountsGamificationService.getTop5Accounts()
        ).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getGamificationData", () => {
    const mockData = {
        userID: "123",
        points: 10,
        streaks: 5,
        lastUnitCompletionDate: expect.anything(),
    };

    it("should return an AccountsGamification object", async () => {
        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsGamificationService.getGamificationData(
            mockData.userID
        );

        expect(result).toBeInstanceOf(accountsGamificationModel.AccountsGamification);
        expect(result).toEqual(mockData);
    });

    it("should return an AccountsGamification object & lastUnitCompletionDate is null", async () => {

        const mockData = {
            userID: "123",
            points: 10,
            streaks: 5,
            lastUnitCompletionDate: null,
        };

        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsGamificationService.getGamificationData(
            mockData.userID
        );

        expect(result).toBeInstanceOf(
            accountsGamificationModel.AccountsGamification
        );
        expect(result).toEqual(mockData);
    });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch account";

        const mockSingle = jest.fn().mockResolvedValue({
            data: mockData,
            error: new Error(errorMessage),
        });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            accountsGamificationService.getGamificationData("789")
        ).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

