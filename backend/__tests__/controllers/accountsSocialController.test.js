const request = require("supertest");
const express = require("express");
const accountsSocialController = require("../../dist/controllers/accountsSocialController");
const accountsSocialService = require("../../dist/services/accountsSocialService");
const accountsSocialRouter = require("../../dist/routes/accountsSocialRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/services/accountsSocialService");

const app = express();
app.use(express.json());
app.use("/accountssocial", accountsSocialRouter);

beforeEach(() => {
    jest.resetAllMocks();
});

/* CREATE */
describe("POST /createaccountsocial", () => {
    const mockAccount = {
        userID: "xxx",
        compLiteracy: "None",
        relationshipToPeers: "Competitive",
        socialBackground: "Rural",
        tendency: "Both",
    };

    it("should create a social account and return 201 on success", async () => {
        accountsSocialService.createAccountSocial.mockResolvedValue([mockAccount]);

        const response = await request(app)
            .post("/accountssocial/createaccountsocial")
            .send(mockAccount);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockAccount.userID,
            status: 201,
            statusText: "Created",
        });
        expect(accountsSocialService.createAccountSocial).toHaveBeenCalledTimes(1);
        expect(accountsSocialService.createAccountSocial).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 on service error", async () => {
        accountsSocialService.createAccountSocial.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post("/accountssocial/createaccountsocial")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to create Account Social",
        });
    });
});

/* READ */
describe("GET /getaccountsocialbyid/:id", () => {
    const mockAccount = {
        userID: "xxx",
        compLiteracy: "None",
        relationshipToPeers: "Competitive",
        socialBackground: "Rural",
        tendency: "Both",
    };

    it("should return a social account by ID and 200 on success", async () => {
        accountsSocialService.getAccountSocialById.mockResolvedValue(mockAccount);

        const response = await request(app).get("/accountssocial/getaccountsocialbyid/xxx");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccount);
        expect(accountsSocialService.getAccountSocialById).toHaveBeenCalledTimes(1);
        expect(accountsSocialService.getAccountSocialById).toHaveBeenCalledWith("xxx");
    });

    it("should return 500 on service error", async () => {
        accountsSocialService.getAccountSocialById.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/accountssocial/getaccountsocialbyid/xxx");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve Account Social",
        });
    });
});

/* DELETE */
describe("DELETE /deleteaccountsocial/:id", () => {
    it("should delete a social account by ID and return 200 on success", async () => {
        accountsSocialService.deleteAccountSocial.mockResolvedValue({});

        const response = await request(app).delete("/accountssocial/deleteaccountsocial/xxx");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 200,
            statusText: "Account Social Deleted Successfully",
        });
        expect(accountsSocialService.deleteAccountSocial).toHaveBeenCalledTimes(1);
        expect(accountsSocialService.deleteAccountSocial).toHaveBeenCalledWith("xxx");
    });

    it("should return 500 on service error", async () => {
        accountsSocialService.deleteAccountSocial.mockRejectedValue(new Error("Database error"));

        const response = await request(app).delete("/accountssocial/deleteaccountsocial/xxx");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to delete Account Social",
        });
    });
});
