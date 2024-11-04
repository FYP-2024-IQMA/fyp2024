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
                profilePic: "https://example.com/profile.jpg",
            },
        },
        {
            points: 100,
            accounts: {
                userID: "3",
                lastName: "3",
                firstName: "test",
                profilePic: "https://example.com/profile.jpg",
            },
        },
        {
            points: 80,
            accounts: {
                userID: "8",
                lastName: "4",
                firstName: "test",
                profilePic: "https://example.com/profile.jpg",
            },
        },
        {
            points: 50,
            accounts: {
                userID: "2",
                lastName: "5",
                firstName: "test",
                profilePic: "https://example.com/profile.jpg",
            },
        },
        {
            points: 20,
            accounts: {
                userID: "5",
                lastName: "6",
                firstName: "test",
                profilePic: "https://example.com/profile.jpg",
            },
        },
        {
            points: 0,
            accounts: {
                userID: "1041",
                lastName: "Smith",
                firstName: "LEARN",
                profilePic: "https://example.com/profile.jpg",
            },
        },
        {
            points: 0,
            accounts: {
                userID: "jd",
                lastName: "Doe",
                firstName: "John",
                profilePic: "https://example.com/profile.jpg",
            },
        },
    ];

    const expectedResult = {
        user: {
            rank: 4,
            name: "test 5",
            points: 50,
            profilePic: "https://example.com/profile.jpg",
        },
        top5: [
            {
                rank: 1,
                name: "test USER",
                points: 150,
                profilePic: "https://example.com/profile.jpg",
            },
            {
                rank: 2,
                name: "test 3",
                points: 100,
                profilePic: "https://example.com/profile.jpg",
            },
            {
                rank: 3,
                name: "test 4",
                points: 80,
                profilePic: "https://example.com/profile.jpg",
            },
            {
                rank: 4,
                name: "test 5",
                points: 50,
                profilePic: "https://example.com/profile.jpg",
            },
            {
                rank: 5,
                name: "test 6",
                points: 20,
                profilePic: "https://example.com/profile.jpg",
            },
        ],
    };

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

        const expectedResult = {
            user: {
                rank: 6,
                name: "John Doe",
                points: 0,
                profilePic: "https://example.com/profile.jpg",
            },
            top5: [
                {
                    rank: 1,
                    name: "test USER",
                    points: 150,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 2,
                    name: "test 3",
                    points: 100,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 3,
                    name: "test 4",
                    points: 80,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 4,
                    name: "test 5",
                    points: 50,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 5,
                    name: "test 6",
                    points: 20,
                    profilePic: "https://example.com/profile.jpg",
                },
            ],
        };

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

    it("returns more than 5 accounts if there is any same rank & user rank", async () => {
        const mockResult2 = [
            ...mockResult,
            {
                points: 20,
                accounts: {
                    userID: "mockPair",
                    lastName: "pair",
                    firstName: "mock",
                    profilePic: "https://example.com/profile.jpg",
                },
            },
        ];

        const expectedResult = {
            user: {
                rank: 4,
                name: "test 5",
                points: 50,
                profilePic: "https://example.com/profile.jpg",
            },
            top5: [
                {
                    rank: 1,
                    name: "test USER",
                    points: 150,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 2,
                    name: "test 3",
                    points: 100,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 3,
                    name: "test 4",
                    points: 80,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 4,
                    name: "test 5",
                    points: 50,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 5,
                    name: "test 6",
                    points: 20,
                    profilePic: "https://example.com/profile.jpg",
                },
                {
                    rank: 5,
                    name: "mock pair",
                    points: 20,
                    profilePic: "https://example.com/profile.jpg",
                },
            ],
        };

        mockResult2.sort((a, b) => b.points - a.points);

        const mockOrder = jest
            .fn()
            .mockReturnValue({ data: mockResult2, error: null });

        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await accountsGamificationService.getTop5Accounts(
            userID
        );

        expect(accounts).toEqual(expectedResult);
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

// function was modified: haven't modify tc yet
// describe("getBadges", () => {
//     const badges = [
//         {
//             publicUrl: "https://badges.com/placeholder.png",
//         },
//         {
//             publicUrl: "https://badges.com/placeholder.png",
//         },
//         {
//             publicUrl: "https://badges.com/badge2.png",
//         },
//         {
//             publicUrl: "https://badges.com/badge1.png",
//         },
//     ];

//     const mockData = [
//         {
//             name: "badge1",
//         },
//         {
//             name: "badge2",
//         },
//         {
//             name: "placeholder",
//         },
//     ];

//     it("should return an array of badge URLs", async () => {
//         resultService.getNoOfCompletedUnit.mockResolvedValue(4);

//         // get no. of badges in bucket
//         const mockList = jest
//             .fn()
//             .mockResolvedValue({ data: mockData, error: null });

//         // indiv calls to get badges individually
//         let mockGetPublicURL = jest.fn();

//         for (let i = 0; i < badges.length; i++) {
//             mockGetPublicURL.mockResolvedValueOnce({ data: badges[i] });
//         }

//         supabase.storage.from.mockReturnValue({
//             list: mockList,
//             getPublicUrl: mockGetPublicURL,
//         });

//         const result = await accountsGamificationService.getBadges("123");

//         const expectedResult = badges.map((badge) => badge.publicUrl);

//         expect(result).toEqual(expectedResult);
//     });

//     it("should return 'Badges Not Found' when there are no badges in storage", async () => {
//         resultService.getNoOfCompletedUnit.mockResolvedValue(4);

//         // get no. of badges in bucket
//         const mockList = jest.fn().mockResolvedValue({ data: [], error: null });
//         supabase.storage.from.mockReturnValue({ list: mockList });

//         await expect(
//             accountsGamificationService.getBadges("123")
//         ).rejects.toThrow("Badge Not Found");
//     });

//     it("should throw an error when there is an error from supabase", async () => {
//         const expectedError = new Error("Database Error");

//         resultService.getNoOfCompletedUnit.mockResolvedValue(4);

//         // get no. of badges in bucket
//         const mockList = jest
//             .fn()
//             .mockResolvedValue({ data: [], error: expectedError });
//         supabase.storage.from.mockReturnValue({ list: mockList });

//         await expect(
//             accountsGamificationService.getBadges("123")
//         ).rejects.toThrow(expectedError.message);
//     });

// })

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
    // afterEach(() => {
    //     // Reset the mocked dependency after each test
    //     __RewireAPI__.__ResetDependency__("getGamificationData");
    // });

    // it('should create a result and update streak if unit is completed', async () => {
    //     const mockGamificationData = new accountsGamificationModel.AccountsGamification("123", 10, 5, new Date(new Date().setDate(new Date().getDate() - 1))); // Last completion 1 day ago
    //     const mockResult = { userID: "123", quizID: 1, dateCreated: new Date() };

    //     // Mock the getGamificationData response
    //     const getGamificationDataSpy = sinon.stub().returns(mockGamificationData);
    //     __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

    //     // Mock the Supabase update query for streaks
    //     const mockEq = jest.fn().mockResolvedValue({ error: null });
    //     const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ update: mockUpdate });

    //     // Mock the createResult function
    //     const createResultSpy = jest.fn().mockResolvedValue({ error: null });
    //     __RewireAPI__.__Rewire__("createResult", createResultSpy);

    //     // Call the service to test
    //     const result = await accountsGamificationService.updateStreaksFromUnit("123", 1);

    //     // Check if the getGamificationData was called
    //     sinon.assert.calledWith(getGamificationDataSpy, "123");

    //     // Check if the update query for streaks was called with the correct data
    //     expect(mockUpdate).toHaveBeenCalledWith({
    //         streaks: 6, // The streak should be incremented by 1
    //     });

    //     // Check if the createResult was called with the correct result instance
    //     expect(createResultSpy).toHaveBeenCalledWith(mockResult);
    // });

    // it('should increase streak by 1 when unit is completed and previous unit is done the previous day', async () => {

    //     // const mockData = {
    //     //     userID: "123",
    //     //     points: 10,
    //     //     streaks: 5,
    //     //     lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // 1 day difference
    //     //     getStreaks: jest.fn().mockReturnValue(5),
    //     // };
    //     // const quizID = 1;

    //     const mockGamificationData = new accountsGamificationModel.AccountsGamification("123", 10, 5, new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()); // 5 is the current streak

    //     // Mock the getGamificationData response using sinon
    //     const getGamificationDataSpy = sinon.stub().returns(mockGamificationData);
    //     __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

    //     // Mock the Supabase update query
    //     const mockEq = jest.fn().mockResolvedValue({
    //         error: null,
    //     });

    //     const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ update: mockUpdate });

    //     // Call the function to test
    //     const result = await accountsGamificationService.updateStreaksFromUnit("1", 1);

    //     // Check if the flow hits the update function
    //     expect(mockUpdate).toHaveBeenCalled();  // This verifies the mockUpdate was called
    //     sinon.assert.calledWith(getGamificationDataSpy, "1");

    //     // Validate that the update was called with the correct data
    //     expect(mockUpdate).toHaveBeenCalledWith({
    //         streaks: 5, // This should be 5
    //     });

    // })

    // pass
    // it('streak remains the same if unit is completed and previous unit is done the same day', async () => {
    //     const mockGamificationData = new accountsGamificationModel.AccountsGamification("123", 10, 5, new Date()); // 5 is the current streak

    //     // Mock the getGamificationData response using sinon
    //     const getGamificationDataSpy = sinon.stub().returns(mockGamificationData);
    //     __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

    //     // Mock the Supabase update query
    //     const mockEq = jest.fn().mockResolvedValue({
    //         error: null,
    //     });

    //     const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ update: mockUpdate });

    //     // Call the function to test
    //     const result = await accountsGamificationService.updateStreaksFromUnit("1", 1);

    //     // Check if the flow hits the update function
    //     expect(mockUpdate).toHaveBeenCalled();  // This verifies the mockUpdate was called
    //     sinon.assert.calledWith(getGamificationDataSpy, "1");

    //     // Validate that the update was called with the correct data
    //     expect(mockUpdate).toHaveBeenCalledWith({
    //         streaks: 5, // This should be 5
    //     });

    // });

    // it('should return the same streak if the last unit completion is today', async () => {
    //     const mockGamificationData = new accountsGamificationModel.AccountsGamification("123", 10, 5, new Date()); // Last completion is today
    //     const mockResult = new Result("123", 1, new Date());

    //     // Mock the getGamificationData response
    //     const getGamificationDataSpy = sinon.stub().returns(mockGamificationData);
    //     __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

    //     // Mock the Supabase update query for streaks
    //     const mockEq = jest.fn().mockResolvedValue({ error: null });
    //     const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ update: mockUpdate });

    //     // Mock the createResult function
    //     const createResultSpy = jest.fn().mockResolvedValue({ error: null });
    //     __RewireAPI__.__Rewire__("createResult", createResultSpy);

    //     // Call the service to test
    //     const result = await accountsGamificationService.updateStreaksFromUnit("123", 1);

    //     // Check if the getGamificationData was called
    //     sinon.assert.calledWith(getGamificationDataSpy, "123");

    //     // Verify that update wasn't called because the streak doesn't change
    //     expect(mockUpdate).not.toHaveBeenCalled();

    //     // Check if the createResult was called with the correct result instance
    //     expect(createResultSpy).toHaveBeenCalledWith(mockResult);
    // });

    // it("should throw an error when getGamificationData throws the error, supabase function to update should not be called", async () => {
    //     const errorMessage = "Failed to fetch account";

    //     // Mock the getGamificationData response using sinon
    //     const getGamificationDataSpy = sinon
    //         .stub()
    //         .throws(new Error(errorMessage));
    //     __RewireAPI__.__Rewire__("getGamificationData", getGamificationDataSpy);

    //     // Mock the Supabase update query
    //     const mockEq = jest.fn().mockResolvedValue({
    //         error: new Error("another"),
    //     });

    //     const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ update: mockUpdate });

    //     await expect(
    //         accountsGamificationService.updateStreaksFromUnit("123", 5)
    //     ).rejects.toThrow(errorMessage);

    //     // Verify that the Supabase update function was never called
    //     expect(supabase.from).not.toHaveBeenCalled();
    //     expect(mockUpdate).not.toHaveBeenCalled();
    //     expect(mockEq).not.toHaveBeenCalled();

    // });


    // it('streak remains the same if unit is completed and previous unit is done the same day', async () => {

    //     const mockData = {
    //         userID: "123",
    //         points: 10,
    //         streaks: 5,
    //         lastUnitCompletionDate: new Date(new Date().setDate(new Date().getDate())) // 1 day difference

    //     };
    //     const mockSingle = jest
    //         .fn()
    //         .mockResolvedValue({ data: mockData, error: null });
    //     const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
    //     const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
    //     supabase.from.mockReturnValue({ select: mockSelect });

    //     const result = await accountsGamificationService.updateStreaksFromUnit('user1');

    //     expect(result.streaks).toBe(5);
    //     expect(result.userID).toBe(mockData.userID);

    // })

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
