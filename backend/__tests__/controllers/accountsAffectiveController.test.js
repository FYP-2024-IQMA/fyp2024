const request = require("supertest");
const express = require("express");
const accountsAffectiveService = require("../../dist/services/accountsAffectiveService");
const accountsAffectiveRouter = require("../../dist/routes/accountsAffectiveRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/accountsaffective", accountsAffectiveRouter);

beforeEach(() => {
    jest.resetAllMocks();
});

/* CREATE */
describe("POST /createaccountaffective", () => {
    const mockAccount = {
        userID: "xx",
        attitude: "Positive",
        barriers: ["Time"],
        motivationalLevel: "High",
        personality: "Extroverted",
        reasons: ["Skill development"]
    };

    it("should create an account and return 201 on success", async () => {
        accountsAffectiveService.createAccountAffective.mockResolvedValue([mockAccount]);

        const response = await request(app)
            .post("/accountsaffective/createaccountaffective")
            .send(mockAccount);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockAccount.userID,
            status: 201,
            statusText: "Created",
        });
        expect(accountsAffectiveService.createAccountAffective).toHaveBeenCalledTimes(1);
        expect(accountsAffectiveService.createAccountAffective).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 on service error", async () => {
        accountsAffectiveService.createAccountAffective.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post("/accountsaffective/createaccountaffective")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to create Account Affective",
        });
    });
});

/* READ */
describe("GET /getaccountaffectivebyid/:id", () => {
    const mockAccount = {
        userID: "xx",
        attitude: "Positive",
        barriers: ["Time"],
        motivationalLevel: "High",
        personality: "Extroverted",
        reasons: ["Skill development"]
    };

    it("should return account by ID and 200 on success", async () => {
        accountsAffectiveService.getAccountAffectiveById.mockResolvedValue(mockAccount);

        const response = await request(app).get("/accountsaffective/getaccountaffectivebyid/xx");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccount);
        expect(accountsAffectiveService.getAccountAffectiveById).toHaveBeenCalledTimes(1);
        expect(accountsAffectiveService.getAccountAffectiveById).toHaveBeenCalledWith("xx");
    });

    it("should return 500 on service error", async () => {
        accountsAffectiveService.getAccountAffectiveById.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/accountsaffective/getaccountaffectivebyid/xx");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve Account Affective",
        });
    });
});


/* DELETE */
describe("DELETE /deleteaccountaffective/:id", () => {
    it("should delete an account by ID and return 200 on success", async () => {
        accountsAffectiveService.deleteAccountAffective.mockResolvedValue({});

        const response = await request(app).delete("/accountsaffective/deleteaccountaffective/USR0001");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "Account Affective Deleted Successfully",
        });
        expect(accountsAffectiveService.deleteAccountAffective).toHaveBeenCalledTimes(1);
        expect(accountsAffectiveService.deleteAccountAffective).toHaveBeenCalledWith("USR0001");
    });

    it("should return 500 on service error", async () => {
        accountsAffectiveService.deleteAccountAffective.mockRejectedValue(new Error("Database error"));

        const response = await request(app).delete("/accountsaffective/deleteaccountaffective/USR0001");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to delete Account Affective",
        });
    });
});
