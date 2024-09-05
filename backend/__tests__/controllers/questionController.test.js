// questionController.test.js

const request = require("supertest");
const express = require("express");
const questionController = require("../../dist/controllers/questionController");
const questionService = require("../../dist/services/questionService");
const questionRouter = require("../../dist/routes/questionRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/questionService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/quiz", questionRouter);

/* READ */

describe("GET /getuserprogress/:sectionid/:unitid?/lessonid?", () => {

    const sectionID = "SEC0001";
    const unitID = "UNIT0001";
    const lessonID = "1a";
    const mockData = [
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

    it("should return 200 and the questions for the quiz - Section", async () => {
        
        questionService.getQuizQuestions.mockResolvedValue(mockData);

        const response = await request(app).get(`/quiz/getquestions/${sectionID}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(questionService.getQuizQuestions).toHaveBeenCalledTimes(1);
    });

    it("should return 200 and the questions for the quiz - Unit", async () => {
        questionService.getQuizQuestions.mockResolvedValue(mockData);

        const response = await request(app).get(
            `/quiz/getquestions/${sectionID}/${unitID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(questionService.getQuizQuestions).toHaveBeenCalledTimes(1);
    });

    it("should return 200 and the questions for the quiz - Lesson", async () => {
        questionService.getQuizQuestions.mockResolvedValue(mockData);

        const response = await request(app).get(
            `/quiz/getquestions/${sectionID}/${unitID}/${lessonID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(questionService.getQuizQuestions).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        questionService.getQuizQuestions.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/quiz/getquestions/${sectionID}/${unitID}/${lessonID}`
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve questions`,
        });
        expect(questionService.getQuizQuestions).toHaveBeenCalledTimes(1);
    });
});


