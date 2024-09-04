const request = require("supertest");
const express = require("express");
const accountsDemographicsController = require("../../dist/controllers/accountsDemographicsController");
const accountsDemographicsService = require("../../dist/services/accountsDemographicsService");
const accountsDemographicsRouter = require("../../dist/routes/accountsDemographicsRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/accountsdemographics", accountsDemographicsRouter);

beforeEach(() => {
    jest.resetAllMocks();
});

/* CREATE */
describe("POST /createaccountdemographics", () => {
    const mockAccount = {
        userID: "xxx",
        careerStage: "Builder",
        ethnicGroup: "malay",
        jobCategory: "Senior-level",
        lifeStage: "Late career",
        race: "Asian",
        specialNeeds: "Other",
    };

    it("should create an account and return 201 on success", async () => {
        accountsDemographicsService.createAccountDemographics.mockResolvedValue([mockAccount]);

        const response = await request(app)
            .post("/accountsdemographics/createaccountdemographics")
            .send(mockAccount);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockAccount.userID,
            status: 201,
            statusText: "Created",
        });
        expect(accountsDemographicsService.createAccountDemographics).toHaveBeenCalledTimes(1);
        expect(accountsDemographicsService.createAccountDemographics).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 on service error", async () => {
        accountsDemographicsService.createAccountDemographics.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post("/accountsdemographics/createaccountdemographics")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to create Account Demographics",
        });
    });
});

/* READ */
describe("GET /getaccountdemographicsbyid/:id", () => {
    const mockAccount = {
        userID: "xxx",
        careerStage: "Builder",
        ethnicGroup: "malay",
        jobCategory: "Senior-level",
        lifeStage: "Late career",
        race: "Asian",
        specialNeeds: "Other",
    };

    it("should return account by ID and 200 on success", async () => {
        accountsDemographicsService.getAccountDemographicsById.mockResolvedValue(mockAccount);

        const response = await request(app).get("/accountsdemographics/getaccountdemographicsbyid/xxx");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccount);
        expect(accountsDemographicsService.getAccountDemographicsById).toHaveBeenCalledTimes(1);
        expect(accountsDemographicsService.getAccountDemographicsById).toHaveBeenCalledWith("xxx");
    });

    it("should return 500 on service error", async () => {
        accountsDemographicsService.getAccountDemographicsById.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/accountsdemographics/getaccountdemographicsbyid/xxx");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve Account Demographics",
        });
    });
});

/* UPDATE */
describe("PATCH /updateaccountdemographics", () => {
    const mockAccount = {
        userID: "xxx",
        careerStage: "Builder",
        ethnicGroup: "malay",
        jobCategory: "Senior-level",
        lifeStage: "Late career",
        race: "Asian",
        specialNeeds: "Other",
    };

    it("should update an account and return 200 on success", async () => {
        accountsDemographicsService.updateAccountCognitive.mockResolvedValue({ status: 200, statusText: "OK" });

        const response = await request(app)
            .patch("/accountsdemographics/updateaccountdemographics")
            .send(mockAccount);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "Account Demographics Updated Successfully",
        });
        expect(accountsDemographicsService.updateAccountCognitive).toHaveBeenCalledTimes(1);
        expect(accountsDemographicsService.updateAccountCognitive).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 on service error", async () => {
        accountsDemographicsService.updateAccountCognitive.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .patch("/accountsdemographics/updateaccountdemographics")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to update Account Demographics",
        });
    });
});

/* DELETE */
describe("DELETE /deleteaccountdemographics/:id", () => {
    it("should delete an account by ID and return 200 on success", async () => {
        accountsDemographicsService.deleteAccountDemographics.mockResolvedValue({});

        const response = await request(app).delete("/accountsdemographics/deleteaccountdemographics/xxx");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "Account Demographics Deleted Successfully",
        });
        expect(accountsDemographicsService.deleteAccountDemographics).toHaveBeenCalledTimes(1);
        expect(accountsDemographicsService.deleteAccountDemographics).toHaveBeenCalledWith("xxx");
    });

    it("should return 500 on service error", async () => {
        accountsDemographicsService.deleteAccountDemographics.mockRejectedValue(new Error("Database error"));

        const response = await request(app).delete("/accountsdemographics/deleteaccountdemographics/xxx");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to delete Account Demographics",
        });
    });
});
