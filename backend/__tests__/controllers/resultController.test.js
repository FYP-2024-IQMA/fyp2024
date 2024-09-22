// resultController.test.js

const request = require("supertest");
const express = require("express");
const resultController = require("../../dist/controllers/resultController");
const resultService = require("../../dist/services/resultService");
const lessonService = require("../../dist/services/lessonService");
const resultRouter = require("../../dist/routes/resultRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/resultService");

jest.mock("../../dist/services/lessonService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/result", resultRouter);

/* CREATE */

describe("POST /createresult", () => {
    const mockResult = {
        userID: "USR0001",
        quizID: 2,
    };

    it("should create the user's result and return 201 on success", async () => {
        resultService.createResult.mockResolvedValue(mockResult.userID);

        const response = await request(app)
            .post("/result/createresult")
            .send(mockResult);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockResult.userID,
            status: 201,
            statusText: "Created",
        });
        expect(resultService.createResult).toHaveBeenCalledTimes(1);
        expect(resultService.createResult).toHaveBeenCalledWith(mockResult);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        resultService.createResult.mockRejectedValue(mockError);

        const response = await request(app)
            .post("/result/createresult")
            .send(mockResult);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to create ${mockResult.userID} Result`,
        });
        expect(resultService.createResult).toHaveBeenCalledTimes(1);
        expect(resultService.createResult).toHaveBeenCalledWith(mockResult);
    });
});

/* READ */

describe("GET /checkifcompletedquiz/:userid/:quizid", () => {
    const userID = "USR0001";
    const quizID = 2;

    it("should return 200 and a boolean result to show if a user has completed the quiz", async () => {
        const mockData = true;

        resultService.checkIfCompletedQuiz.mockResolvedValue(mockData);

        const response = await request(app).get(
            `/result/getifcompletedquiz/${userID}/${quizID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(resultService.checkIfCompletedQuiz).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const errMessage = "Database error";
        const mockError = new Error("Database error");

        resultService.checkIfCompletedQuiz.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/result/checkifcompletedquiz/${userID}/${quizID}`
        );

        expect(response.status).toBe(500);
        expect(response.body.details).toEqual(errMessage);
        expect(resultService.checkIfCompletedQuiz).toHaveBeenCalledTimes(1);
    });
});

describe("GET /getuserprogress/:userid", () => {

    const userID = "USR0001";

    it("should return 200 and the no. of section completed by a user", async () => {
        resultService.getUserProgress.mockResolvedValue(5);

        const response = await request(app).get(`/result/getuserprogress/${userID}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(5);
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        resultService.getUserProgress.mockRejectedValue(mockError);

        const response = await request(app).get(`/result/getuserprogress/${userID}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve ${userID}'s progress`,
        });
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });
});

describe("GET /getuserprogress/:userid/:sectionid", () => {

    const userID = "USR0001";
    const sectionID = "SEC0001";

    it("should return 200 and the no. of unit completed by a user", async () => {
        resultService.getUserProgress.mockResolvedValue(5);

        const response = await request(app).get(
            `/result/getuserprogress/${userID}/${sectionID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(5);
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        resultService.getUserProgress.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/result/getuserprogress/${userID}/${sectionID}`
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve ${userID}'s progress`,
        });
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });
});

describe("GET /getcircularprogress/:userid/:sectionid/:unitid", () => {
    const userID = "USR0001";
    const sectionID = "SEC0001";
    const unitID = "UNIT0001";

    it("should return 200 and the unit progress of a user", async () => {
        resultService.getUserProgress.mockResolvedValue(2);
        lessonService.getNoOfLessonPerUnit.mockResolvedValue(3);

        const expectedResult = 2 / (3 + 1)

        const response = await request(app).get(
            `/result/getcircularprogress/${userID}/${sectionID}/${unitID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResult);
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        resultService.getUserProgress.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/result/getcircularprogress/${userID}/${sectionID}/${unitID}`
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve ${userID}'s progress`,
        });
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        resultService.getUserProgress.mockResolvedValue(2);
        lessonService.getNoOfLessonPerUnit.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/result/getcircularprogress/${userID}/${sectionID}/${unitID}`
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve ${userID}'s progress`,
        });
        expect(resultService.getUserProgress).toHaveBeenCalledTimes(1);
    });
});

describe("GET /getnoofcompletedlessons/:userid/:sectionid/:unitid", () => {
    const userID = "USR0001";
    const sectionID = "SEC0001";
    const unitID = "UNIT0001";

    it("should return 200 and the unit progress of a user", async () => {
        resultService.getNoOfCompletedLesson.mockResolvedValue(2);

        const response = await request(app).get(
            `/result/getnoofcompletedlessons/${userID}/${sectionID}/${unitID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(2);
        expect(resultService.getNoOfCompletedLesson).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        resultService.getNoOfCompletedLesson.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/result/getnoofcompletedlessons/${userID}/${sectionID}/${unitID}`
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve ${userID}'s progress`,
        });
        expect(resultService.getNoOfCompletedLesson).toHaveBeenCalledTimes(1);
    });

});