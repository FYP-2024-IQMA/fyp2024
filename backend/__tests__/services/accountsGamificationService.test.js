const supabase = require("../../dist/config/supabaseConfig");
const accountsGamificationModel = require("../../dist/models/accountsGamificationModel");
const accountsGamificationService = require("../../dist/services/accountsGamificationService");
const __RewireAPI__ = require("../../dist/services/accountsGamificationService").__RewireAPI__;
const sinon = require("sinon");
const resultService = require("../../dist/services/resultService");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
    storage: {
        from: jest.fn(),
    },
}));

jest.mock("../../dist/services/resultService");

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

describe("getTop5Accounts", () => {
    const userID = "2";

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
                firstName: "John",
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
        const mockOrder = jest
            .fn()
            .mockReturnValue({ data: mockResult, error: null });

        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await accountsGamificationService.getTop5Accounts(
            userID
        );
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

        const mockOrder = jest
            .fn()
            .mockResolvedValue({ data: null, error: new Error(errorMessage) });

        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });

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

        expect(result).toBeInstanceOf(
            accountsGamificationModel.AccountsGamification
        );
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

describe("getBadges", () => {
    const badges = [
        {
            publicUrl: "https://badges.com/badge2.png",
        },
        {
            publicUrl: "https://badges.com/badge1.png",
        },
    ];

    const mockData = [
        {
            badge: "badge1",
        },
        {
            badge: "badge2",
        }
    ]

    it("should return an array of badge URLs", async () => {
        resultService.getNoOfCompletedUnit.mockResolvedValue(4);

        // get no. of badges in bucket
        const mockList = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        // supabase.storage.from.mockReturnValue({ list: mockList });

        // indiv calls to get badges individually

        let mockGetPublicURL = jest.fn();

        for (let i = 0; i < badges.length; i++) {
            mockGetPublicURL.mockResolvedValueOnce({ data: badges[i] });
        }

        supabase.storage.from.mockReturnValue({
            list: mockList,
            getPublicUrl: mockGetPublicURL,
        });

        const result = await accountsGamificationService.getBadges("123");

        const expectedResult = badges.map((badge) => badge.publicUrl);

        expect(result).toEqual([
            "Badge Design in Progress!",
            "Badge Design in Progress!",
            ...expectedResult,
        ]);
    });

    it("should return 'Badges Not Found' when there are no badges in storage", async () => {
        resultService.getNoOfCompletedUnit.mockResolvedValue(4);

        // get no. of badges in bucket
        const mockList = jest.fn().mockResolvedValue({ data: [], error: null });
        supabase.storage.from.mockReturnValue({ list: mockList });

        await expect(
            accountsGamificationService.getBadges("123")
        ).rejects.toThrow("Badge Not Found");
    });

    it("should throw an error when there is an error from supabase", async () => {
        const expectedError = new Error("Database Error");

        resultService.getNoOfCompletedUnit.mockResolvedValue(4);

        // get no. of badges in bucket
        const mockList = jest
            .fn()
            .mockResolvedValue({ data: [], error: expectedError });
        supabase.storage.from.mockReturnValue({ list: mockList });

        await expect(
            accountsGamificationService.getBadges("123")
        ).rejects.toThrow(expectedError.message);
    });

})

describe("updatePoints", () => {
    afterEach(() => {
        // Reset the mocked dependency after each test
        __RewireAPI__.__ResetDependency__("getGamificationData");
    });

    const mockGamificationData =
        new accountsGamificationModel.AccountsGamification("123", 10, 5, null);

    const expectedResult = {
        status: 204,
        statusText: "No Content",
    };

    it("should update the account successfully when valid fields are provided", async () => {
        // Mock the getGamificationData response using sinon
        const getGamificationDataSpy = sinon
            .stub()
            .returns(mockGamificationData);
        __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

        // Mock the Supabase update query
        const mockEq = jest.fn().mockResolvedValue({
            ...expectedResult,
            error: null,
        });

        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ update: mockUpdate });

        // Call the function to test
        const result = await accountsGamificationService.updatePoints("123", 5);

        sinon.assert.calledWith(getGamificationDataSpy, "123");

        // Validate that the update was called with the correct data
        expect(mockUpdate).toHaveBeenCalledWith({
            points: mockGamificationData.getPoints() + 5,
        });

        // Validate that the result matches the expected output
        expect(result).toEqual(expectedResult);
    });

    it("should throw an error and log the error when supabase function to update threw the error", async () => {
        const errorMessage = "update error";

        // Mock the getGamificationData response using sinon
        const getGamificationDataSpy = sinon.stub().returns(mockGamificationData);
        __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

        // Mock the Supabase update query
        const mockEq = jest.fn().mockResolvedValue({
            ...expectedResult,
            error: new Error(errorMessage),
        });

        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ update: mockUpdate });

        await expect(
            accountsGamificationService.updatePoints("123", 5)
        ).rejects.toThrow(errorMessage);

        // Check if console.error was called with the expected message
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it("should throw an error when getGamificationData throws the error, supabase function to update should not be called", async () => {
        const errorMessage = "Failed to fetch account";

        // Mock the getGamificationData response using sinon
        const getGamificationDataSpy = sinon
            .stub()
            .throws(new Error(errorMessage));
        __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

        // Mock the Supabase update query
        const mockEq = jest.fn().mockResolvedValue({
            ...expectedResult,
            error: new Error("another"),
        });

        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ update: mockUpdate });

        await expect(
            accountsGamificationService.updatePoints("123", 5)
        ).rejects.toThrow(errorMessage);

        // Verify that the Supabase update function was never called
        expect(supabase.from).not.toHaveBeenCalled();
        expect(mockUpdate).not.toHaveBeenCalled();
        expect(mockEq).not.toHaveBeenCalled();

    });
});
