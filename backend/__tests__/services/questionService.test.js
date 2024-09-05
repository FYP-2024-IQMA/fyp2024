const questionService = require("../../dist/services/questionService");
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


/* READ */

describe("getQuizQuestions", () => {

    const sectionID = "SEC0001";
    const unitID = "UNT0001";
    const lessonID = "1a";
    const expectedResult = [
        {
            quizID: 1,
            questionNo: 1,
            question: "qn1",
            option1: {
                option: "option1",
                explanation: "Incorrect. option1 explanation",
            },
            option2: {
                option: "option2",
                explanation: "Incorrect. option2 explanation",
            },
            option3: {
                option: "option3",
                explanation: "Correct. option3 explanation",
            },
            option4: {
                option: "option4",
                explanation: "Incorrect. option4 explanation",
            },
            answer: "option3",
            isSelfReflection: false,
        },
        {
            quizID: 1,
            questionNo: 2,
            question: "qn2",
            option1: {
                option: "option1",
                explanation: "Incorrect. option1 explanation",
            },
            option2: {
                option: "option2",
                explanation: "Incorrect. option2 explanation",
            },
            option3: {
                option: "option3",
                explanation: "Correct. option3 explanation",
            },
            option4: {
                option: "option4",
                explanation: "Incorrect. option4 explanation",
            },
            answer: "option3",
            isSelfReflection: false,
        },
    ];
    
    const mockData = expectedResult.map((item) => ({
        ...item,
        quiz: {
            quizID: item.quizID,
        },
    }));

   it("should return the questions in a quiz - Section", async () => {

        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockOrder = jest.fn().mockReturnValue({ eq: mockEq1 });
        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const questions = await questionService.getQuizQuestions(sectionID);

        // Verifying the chain of calls
        expect(mockEq2).toHaveBeenCalledWith("quiz.quizType", "section");
       
        // not called with
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.unitID", unitID);

        // Check the result
        expect(questions).toEqual(expectedResult);
   });
    
    it("should return the questions in a quiz - Unit", async () => {

        const mockEq3 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockOrder = jest.fn().mockReturnValue({ eq: mockEq1 });
        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const questions = await questionService.getQuizQuestions(sectionID, unitID);

        // Verifying the chain of calls
        expect(mockEq2).toHaveBeenCalledWith("quiz.unitID", unitID);
        expect(mockEq3).toHaveBeenCalledWith("quiz.quizType", "unit");

        // not called with
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.quizType", "section");    

        // Check the result
        expect(questions).toEqual(expectedResult);
    });

    it("should return the questions in a quiz - Lesson", async () => {
        
        const mockEq4 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq3 = jest.fn().mockReturnValue({ eq: mockEq4 });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockOrder = jest.fn().mockReturnValue({ eq: mockEq1 });
        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const questions = await questionService.getQuizQuestions(
            sectionID,
            unitID,
            lessonID
        );

        // Verifying the chain of calls
        expect(mockEq2).toHaveBeenCalledWith("quiz.unitID", unitID);
        expect(mockEq3).toHaveBeenCalledWith("quiz.lessonID", lessonID);
        expect(mockEq4).toHaveBeenCalledWith("quiz.quizType", "lesson");

        // not called with
        expect(mockEq2).not.toHaveBeenCalledWith("quiz.quizType", "section");
        expect(mockEq3).not.toHaveBeenCalledWith("quiz.quizType", "unit");

        // Check the result
        expect(questions).toEqual(expectedResult);
    });
    
    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch from database";

        // Mocking the chain of calls
        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: new Error(errorMessage) });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockOrder = jest.fn().mockReturnValue({ eq: mockEq1 });
        const mockSelect = jest.fn().mockReturnValue({ order: mockOrder });
        supabase.from.mockReturnValue({ select: mockSelect });
        
        await expect(
            questionService.getQuizQuestions(sectionID)
        ).rejects.toThrow(errorMessage);
    
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

});

