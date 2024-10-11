// accountsGamificationController.test.js

const request = require("supertest");
const express = require("express");
const accountsGamificationController = require("../../dist/controllers/accountsGamificationController");
const accountsGamificationService = require("../../dist/services/accountsGamificationService");
const accountsGamificationRouter = require("../../dist/routes/accountsGamificationRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/accountsGamificationService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/accounts", accountsGamificationRouter);

describe("GET /accounts/leaderboard", () => {
    it("should return 200 and the list of accounts on success", async () => {
        const mockAccounts = [
            {
                rank: 1,
                name: "test USER",
                points: 150,
            },
            {
                rank: 2,
                name: "test 3",
                points: 100,
            },
            {
                rank: 3,
                name: "test 4",
                points: 80,
            },
            {
                rank: 4,
                name: "test 5",
                points: 50,
            },
            {
                rank: 5,
                name: "test 6",
                points: 20,
            },
        ];

        accountsGamificationService.getTop5Accounts.mockResolvedValue(mockAccounts);

        const response = await request(app).get(`/accounts/leaderboard/1`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccounts);
        expect(accountsGamificationService.getTop5Accounts).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsGamificationService.getTop5Accounts.mockRejectedValue(mockError);

        const response = await request(app).get(`/accounts/leaderboard/1`);

        expect(response.status).toBe(500);
        expect(accountsGamificationService.getTop5Accounts).toHaveBeenCalledTimes(1);
    });
});

describe("GET /accounts/gamificationdata", () => {
    const mockAccounts = {
        userID: "2",
        points: 0,
        streaks: 0,
        lastUnitCompletionDate: expect.anything(),
    };

    it("should return 200 and the account on success", async () => {
        accountsGamificationService.getGamificationData.mockResolvedValue(mockAccounts);

        const response = await request(app).get(
            `/accounts/gamificationdata/${mockAccounts.userID}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccounts);
        expect(accountsGamificationService.getGamificationData).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsGamificationService.getGamificationData.mockRejectedValue(mockError);

        const response = await request(app).get(
            `/accounts/gamificationdata/${mockAccounts.userID}`
        );

        expect(response.status).toBe(500);
        expect(accountsGamificationService.getGamificationData).toHaveBeenCalledTimes(1);
    });
});

describe("PATCH /accounts/updatepoints", () => {
    const mockAccount = {
        userID: "1",
        points: 100,
    };

    it("should update an account and return 204 on success", async () => {
        const mockResponse = { status: 204, statusText: "OK" };

        accountsGamificationService.updatePoints.mockResolvedValue(mockResponse);

        const response = await request(app)
            .patch("/accounts/updatepoints")
            .send(mockAccount);

        expect(response.status).toBe(200);
        expect(response.body.statusText).toBe("Points Updated Successfully");
        expect(accountsGamificationService.updatePoints).toHaveBeenCalledTimes(1);
        expect(accountsGamificationService.updatePoints).toHaveBeenCalledWith(
            mockAccount.userID,
            mockAccount.points
        );
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsGamificationService.updatePoints.mockRejectedValue(mockError);

        const response = await request(app)
            .patch("/accounts/updatepoints")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(accountsGamificationService.updatePoints).toHaveBeenCalledTimes(1);
        expect(accountsGamificationService.updatePoints).toHaveBeenCalledWith(
            mockAccount.userID,
            mockAccount.points
        );
    });
});
