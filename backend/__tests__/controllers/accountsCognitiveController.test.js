const request = require("supertest");
const express = require("express");
const accountsCognitiveController = require("../../dist/controllers/accountsCognitiveController");
const accountsCognitiveService = require("../../dist/services/accountsCognitiveService");
const accountsCognitiveRouter = require("../../dist/routes/accountsCognitiveRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/services/accountsCognitiveService");

const app = express();
app.use(express.json());
app.use("/accountscognitive", accountsCognitiveRouter);

beforeEach(() => {
    jest.resetAllMocks();
});

/* CREATE */
describe("POST /createaccountcognitive", () => {
    const mockAccount = {
        userID: "xxx",
        educationalLevel: "Some college",
        languageAbilities: "Basic",
        learningPreferences: "Reading/Writing",
        litNumProficiency: "Basic",
        priorKnowledge: "None"
    };

    it("should create an account and return 201 on success", async () => {
        accountsCognitiveService.createAccountCognitive.mockResolvedValue([mockAccount]);

        const response = await request(app)
            .post("/accountscognitive/createaccountcognitive")
            .send(mockAccount);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockAccount.userID,
            status: 201,
            statusText: "Created",
        });
        expect(accountsCognitiveService.createAccountCognitive).toHaveBeenCalledTimes(1);
        expect(accountsCognitiveService.createAccountCognitive).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 on service error", async () => {
        accountsCognitiveService.createAccountCognitive.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post("/accountscognitive/createaccountcognitive")
            .send(mockAccount);


        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to create Account Cognitive",
        });
    });
});


/* READ */
describe("GET /getaccountcognitivebyid/:id", () => {
    const mockAccount = {
        userID: "xxx",
        educationalLevel: "Some college",
        languageAbilities: "Basic",
        learningPreferences: "Reading/Writing",
        litNumProficiency: "Basic",
        priorKnowledge: "None"
    };

    it("should return account by ID and 200 on success", async () => {
        accountsCognitiveService.getAccountCognitiveById.mockResolvedValue(mockAccount);

        const response = await request(app).get("/accountscognitive/getaccountcognitivebyid/xxx");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccount);
        expect(accountsCognitiveService.getAccountCognitiveById).toHaveBeenCalledTimes(1);
        expect(accountsCognitiveService.getAccountCognitiveById).toHaveBeenCalledWith("xxx");
    });

    it("should return 500 on service error", async () => {
        accountsCognitiveService.getAccountCognitiveById.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/accountscognitive/getaccountcognitivebyid/xxx");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve Account Cognitive",
        });
    });
});


/* DELETE */
describe("DELETE /accountscognitive/deleteaccountcognitive/:id", () => {
    it("should delete an account by ID and return 200 on success", async () => {
        accountsCognitiveService.deleteAccountCognitive.mockResolvedValue({});

        const response = await request(app).delete("/accountscognitive/deleteaccountcognitive/USR0002");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "Account Cognitive Deleted Successfully",
        });
        expect(accountsCognitiveService.deleteAccountCognitive).toHaveBeenCalledTimes(1);
        expect(accountsCognitiveService.deleteAccountCognitive).toHaveBeenCalledWith("USR0002");
    });

    it("should return 500 on service error", async () => {
        accountsCognitiveService.deleteAccountCognitive.mockRejectedValue(new Error("Database error"));

        const response = await request(app).delete("/accountscognitive/deleteaccountcognitive/USR0002");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to delete Account Cognitive",
        });
    });
});
