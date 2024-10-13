const supabase = require("../../dist/config/supabaseConfig");
const accountsGamificationModel = require("../../dist/models/accountsGamificationModel");
const accountsGamificationService = require("../../dist/services/accountsGamificationService");
const __RewireAPI__ = require("../../dist/services/accountsGamificationService").__RewireAPI__;
const sinon = require("sinon");
const resultService = require("../../dist/services/resultService");

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
// describe("getStreaks", () => {
//     it("should return streaks", async () => {
//         const mockData = {
//             streaks: 5,
//         };

//         const mockSingle = jest
//             .fn()
//             .mockResolvedValue({ data: mockData, error: null });
//         const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
//         const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
//         supabase.from.mockReturnValue({ select: mockSelect });

//         const result = await accountsGamificationService.getStreaks("123");

//         expect(result).toBe(mockData.streaks);
//     });

//     it("should throw an error when there is an error from supabase", async () => {
//         const errorMessage = "Failed to fetch streaks";

//         const mockSingle = jest.fn().mockResolvedValue({
//             data: null,
//             error: new Error(errorMessage),
//         });
//         const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
//         const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
//         supabase.from.mockReturnValue({ select: mockSelect });

//         await expect(
//             accountsGamificationService.getStreaks("789")
//         ).rejects.toThrow(errorMessage);
//         expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
//     });
// });

describe("updateStreaksFromLogin", () => {


    it('should return the same streak when login is successful and streak stays as login is consecutive', async () => {

        const mockData = {
            userID: "123",
            points: 10,
            streaks: 5,
            lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate() - 1)) // 1 day difference

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
        const mockUpdate = jest.fn().mockResolvedValue({ status: 204, statusText: "Streak Updated Successfully" });

        expect(result).toBeInstanceOf(accountsGamificationModel.AccountsGamification);
        expect(result).toEqual(mockData);

        expect(supabase.from).toHaveBeenCalledWith('accountsgamification');
        expect(mockEq).toHaveBeenCalledWith('userID', mockData.userID);

    });

    // it('should reset the streak if the user has not logged in for more than 1 day', async () => {

    //     const mockData = {
    //         userID: "123",
    //         points: 10,
    //         streaks: 5,
    //         lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate() - 5)) // 1 day difference

    //     };

    //     const mockSingle = jest
    //         .fn()
    //         .mockResolvedValue({ data: mockData, error: null });
    //     const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
    //     const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ select: mockSelect });

    //     const result = await accountsGamificationService.updateStreaksFromLogin(
    //         mockData.userID
    //     );
    //     const mockUpdate = jest.fn().mockResolvedValue({ status: 204, statusText: "Streak Updated Successfully" });

    //     expect(result).toBeInstanceOf(accountsGamificationModel.AccountsGamification);
    //     expect(result).toEqual({
    //         ...mockData,
    //         streaks: 0
    //     });

    //     expect(supabase.from).toHaveBeenCalledWith('accountsgamification');
    //     expect(mockEq).toHaveBeenCalledWith('userID', mockData.userID);



    //     // accountsGamificationService.getGamificationData.mockResolvedValue(mockData);

    //     await accountsGamificationService.updateStreaksFromLogin(userID);

    //     expect(getGamificationData).toHaveBeenCalledWith(userID);
    //     expect(mockData.getStreaks).toHaveBeenCalled();
    //     // expect(supabase.from().update).toHaveBeenCalledWith({ streaks: 0 });
    //     expect(supabase.from().eq).toHaveBeenCalledWith('userID', userID);
    // });

    it('should reset the streak if the user has not logged in for more than 1 day', async () => {
        const mockData = {
            userID: "123",
            points: 10,
            streaks: 5,
            lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate() - 5)) // 5 days difference
        };

        // Mock for getGamificationData
        const mockSingle = jest.fn().mockResolvedValue({ data: mockData, error: null });
        const mockEqSelect = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEqSelect });

        // Mock for updateStreaksFromLogin
        const mockEqUpdate = jest.fn().mockResolvedValue({ status: 204, statusText: "Streak Updated Successfully" });
        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEqUpdate });

        // Setup the mock to return different values based on the method chain
        supabase.from.mockReturnValue({
            select: mockSelect,
            update: mockUpdate
        });

        // Call updateStreaksFromLogin
        await accountsGamificationService.updateStreaksFromLogin(mockData.userID);

        // Verify getGamificationData was called correctly
        expect(supabase.from).toHaveBeenCalledWith('accountsgamification');
        expect(mockSelect).toHaveBeenCalledWith('*');
        expect(mockEqSelect).toHaveBeenCalledWith('userID', mockData.userID);

        // Verify updateStreaksFromLogin updated the streak to 0
        expect(mockUpdate).toHaveBeenCalledWith({ streaks: 0 });
        expect(mockEqUpdate).toHaveBeenCalledWith('userID', mockData.userID);
    });

});

describe("updateStreaksFromUnit", () => {

    it('should increase streak by 1 when unit is completed and previous unit is done the previous day', async () => {

        const mockData = {
            userID: "123",
            points: 10,
            streaks: 5,
            lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // 1 day difference
            getStreaks: jest.fn().mockReturnValue(5),
        };
        quizID = 1;

        // Mock the result creation and gamification data
        // resultService.createResult.mockResolvedValue(mockData.userID);
        jest.spyOn(resultService, 'createResult').mockResolvedValue(mockData.userID);  // Correctly mock the resultService

        accountsGamificationService.getGamificationData.mockResolvedValue(mockData);

        const mockUpdate = jest.fn().mockResolvedValue({ status: 200, statusText: "OK" });
        const mockEq = jest.fn().mockReturnValue({ update: mockUpdate });
        supabase.from.mockReturnValue({ eq: mockEq });

        await updateStreaksFromUnit(mockData.userID, quizID);

        expect(resultService.createResult).toHaveBeenCalledWith(expect.any(Object));
        expect(accountsGamificationService.getGamificationData).toHaveBeenCalledWith(mockData.userID);

        // Validate the streak increment
        expect(mockData.getStreaks).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalledWith({ streaks: 6 }); // Incremented streak
        expect(mockEq).toHaveBeenCalledWith('userID', mockData.userID);

    })

    it('streak remains the same if unit is completed and previous unit is done the same day', async () => {

        const mockData = {
            userID: "123",
            points: 10,
            streaks: 5,
            lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate())) // 1 day difference

        };
        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsGamificationService.updateStreaksFromUnit('user1');

        expect(result.streaks).toBe(5);
        expect(result.userID).toBe(mockData.userID);

    })

    //     it('streak is set to 1 if its the first unit completed in many days', async () => {

    //         const mockData = {
    //             userID: "123",
    //             points: 10,
    //             streaks: 5,
    //             lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate() - 5)) // 5 day difference

    //         };

    //         const mockSingle = jest
    //             .fn()
    //             .mockResolvedValue({ data: mockData, error: null });
    //         const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
    //         const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
    //         supabase.from.mockReturnValue({ select: mockSelect });

    //         const result = await updateStreaksFromUnit('user1');

    //         expect(result.streaks).toBe(1);
    //         expect(result.userID).toBe('user1');

    //     })


});
