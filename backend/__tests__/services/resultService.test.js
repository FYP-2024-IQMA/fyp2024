const resultService = require("../../dist/services/resultService");
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

/* CREATE */

describe("createResult", () => {
    const mockData = [
        {
            userID: "USR0001",
            quizID: 2,
        },
    ];

    it("create user result", async () => {
        const mockInsert = jest
            .fn()
            .mockResolvedValue({ error: null });
        supabase.from.mockReturnValue({ insert: mockInsert });

        const result = await resultService.createResult(mockData[0]);

        expect(mockInsert).toHaveBeenCalledWith(mockData[0]);

        expect(result).toEqual(mockData[0].userID);
    });

    it("handles error correctly and logs it to console.error", async () => {
        const errorMessage = "Failed to fetch all accounts";

        const mockInsert = jest.fn().mockResolvedValue({
            error: new Error(errorMessage),
        });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(resultService.createResult(mockData[0])).rejects.toThrow(errorMessage);

        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

/* READ */

describe("getResultByUserId", () => {
    const mockData = [
        {
            quizID: 1,
            dateCreated: "2024-09-01T05:26:54.096997+00:00",
        },
        {
            quizID: 2,
            dateCreated: "2024-09-01T05:27:01.340253+00:00",
        },
    ];

    const userID = "USR0001";

    it("should return an array of quizID & dateCreated", async () => {
        const mockEq = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await resultService.getResultByUserId(userID);

        expect(result).toEqual(mockData);
    });

    it("should throw an error and log the error when there is an error from the database", async () => {
        const errorMessage = "Failed to fetch user results";

        const mockEq = jest
            .fn()
            .mockResolvedValue({ data: null, error: new Error(errorMessage) });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(resultService.getResultByUserId(userID)).rejects.toThrow(errorMessage);
        
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getUserProgress", () => {

    const userID = "USR0001";
    const sectionID = "SEC0001";
    const unitID = "UNT0001";
    const mockCount = 2;
    const expectedResult = 2;

   it("should return the no. of section completed by a user", async () => {

        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: null });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const result = await resultService.getUserProgress(userID);

        // Verifying the chain of calls
        expect(mockEq1).toHaveBeenCalledWith("userID", userID);
        expect(mockEq2).toHaveBeenCalledWith("quiz.quizType", "section");
       
        // not called with
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.quizType", "unit");
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.sectionID", sectionID);

        // Check the result
        expect(result).toEqual(expectedResult);
   });
    
    it("should return the no. of unit completed by a user", async () => {
       
        const mockEq3 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: null });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const result = await resultService.getUserProgress(userID, sectionID);

        // Verifying the chain of calls
        expect(mockEq1).toHaveBeenCalledWith("userID", userID);
        expect(mockEq2).toHaveBeenCalledWith("quiz.quizType", "unit");
        expect(mockEq3).toHaveBeenCalledWith("quiz.sectionID", sectionID);

        // not called with
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.quizType", "section");
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.sectionID", sectionID);

        // Check the result
        expect(result).toEqual(expectedResult);
   });

    it("should return the no. of lesson & unit quizzes completed by a user", async () => {
        
        const mockEq4 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: null });
        const mockEq3 = jest.fn().mockReturnValue({ neq: mockEq4 });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const result = await resultService.getUserProgress(userID, sectionID, unitID);


        expect(mockEq1).toHaveBeenCalledWith("userID", userID);
        expect(mockEq2).toHaveBeenCalledWith("quiz.sectionID", sectionID);
        expect(mockEq3).toHaveBeenCalledWith("quiz.unitID", unitID);
        expect(mockEq4).toHaveBeenCalledWith("quiz.quizType", "section");

        // not called with
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.quizType", "unit");
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.quizType", "section");
        expect(mockEq3).not.toHaveBeenCalledWith("quiz.sectionID", sectionID);

        // Check the result
        expect(result).toEqual(expectedResult);
    });
    
    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch from database";

        // Mocking the chain of calls
        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: new Error(errorMessage) });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });
        
        await expect(
            resultService.getUserProgress(userID)
        ).rejects.toThrow(errorMessage);
    
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

});

describe("getNoOfCompletedLesson", () => {
    const userID = "USR0001";
    const sectionID = "SEC0001";
    const unitID = "UNT0001";
    const mockCount = 2;
    const expectedResult = 2;

    it("should return the no. of lesson quizzes completed by a user", async () => {
        const mockEq4 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: null });
        const mockEq3 = jest.fn().mockReturnValue({ eq: mockEq4 });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const result = await resultService.getNoOfCompletedLesson(
            userID,
            sectionID,
            unitID
        );

        expect(mockEq1).toHaveBeenCalledWith("userID", userID);
        expect(mockEq2).toHaveBeenCalledWith("quiz.sectionID", sectionID);
        expect(mockEq3).toHaveBeenCalledWith("quiz.unitID", unitID);
        expect(mockEq4).toHaveBeenCalledWith("quiz.quizType", "lesson");

        // Check the result
        expect(result).toEqual(expectedResult);
    });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch from database";

        // Mocking the chain of calls
        const mockEq4 = jest
            .fn()
            .mockResolvedValue({ count: null, error: new Error(errorMessage) });
        const mockEq3 = jest.fn().mockReturnValue({ eq: mockEq4 });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            resultService.getNoOfCompletedLesson(userID, sectionID, unitID)
        ).rejects.toThrow(errorMessage);

        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

