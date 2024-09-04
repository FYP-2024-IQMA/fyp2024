const request = require("supertest");
const express = require("express");
const sectionController = require("../../dist/controllers/sectionController");
const sectionService = require("../../dist/services/sectionService");
const sectionRouter = require("../../dist/routes/sectionRouter").default;

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/sectionService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/section", sectionRouter);

describe("GET /section/sectiondetails/:sectionID", () => {
    const mockSection = {
        sectionID: 'SEC0001',
        sectionName: 'Communication',
        sectionDescription: null,
        introductionURL: 'https://youtube.com/shorts/pU4fCakueEE?si=AbLsf_OkPRZ-TLWq',
        finalAssessmentIntro: "Welcome to the Grand Presentation Showdown...",
        finalScenario: "You are part of a team participating in a high-stakes competition...",
        dateCreated: '2024-08-18T14:59:01.549137+00:00'
    };

    it("should return 200 and the section details on success", async () => {

        const expectedResults = {
            ...mockSection,
            introductionURL: 'pU4fCakueEE',
        }
        sectionService.getSectionDetails.mockResolvedValue({
            ...mockSection,
            introductionURL: 'pU4fCakueEE',
        });

        const response = await request(app).get("/section/sectiondetails/SEC0001");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResults);
        expect(sectionService.getSectionDetails).toHaveBeenCalledTimes(1);
        expect(sectionService.getSectionDetails).toHaveBeenCalledWith("SEC0001");
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        sectionService.getSectionDetails.mockRejectedValue(mockError);

        const response = await request(app).get("/section/sectiondetails/SEC0001");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve section details",
        });
        expect(sectionService.getSectionDetails).toHaveBeenCalledTimes(1);
        expect(sectionService.getSectionDetails).toHaveBeenCalledWith("SEC0001");
    });
});

describe("GET /section/sectiondetails", () => {
    const mockSections = [
        {
            sectionID: 'SEC0001',
            sectionName: 'Communication',
            sectionDescription: null,
            introductionURL: 'https://youtube.com/shorts/pU4fCakueEE?si=AbLsf_OkPRZ-TLWq',
            finalAssessmentIntro: "Welcome to the Grand Presentation Showdown...",
            finalScenario: "You are part of a team participating in a high-stakes competition...",
            dateCreated: '2024-08-18T14:59:01.549137+00:00'
        },
        {
            sectionID: 'SEC0002',
            sectionName: 'Team Collaboration',
            sectionDescription: 'Learn how to work effectively in teams.',
            introductionURL: 'https://youtube.com/shorts/abc12345xyz?si=AbLsf_OkPRZ-TLWq',
            finalAssessmentIntro: "This is your team collaboration challenge...",
            finalScenario: "Your team must create a project plan under a tight deadline...",
            dateCreated: '2024-08-20T14:59:01.549137+00:00'
        }
    ];

    it("should return 200 and a list of all sections with formatted URLs on success", async () => {

        const expectedSections = [
            {
                ...mockSections[0],
                introductionURL: 'pU4fCakueEE',
            },
            {
                ...mockSections[1],
                introductionURL: 'abc12345xyz',
            }
        ];

        sectionService.getAllSections.mockResolvedValue([
            {
                ...mockSections[0],
                introductionURL: 'pU4fCakueEE',
            },
            {
                ...mockSections[1],
                introductionURL: 'abc12345xyz',
            }
        ]);

        const response = await request(app).get("/section/sectiondetails");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedSections);
        expect(sectionService.getAllSections).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        sectionService.getAllSections.mockRejectedValue(mockError);

        const response = await request(app).get("/section/sectiondetails");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve section details",
        });
        expect(sectionService.getAllSections).toHaveBeenCalledTimes(1);
    });
});