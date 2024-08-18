// accountsController.test.js

const request = require("supertest");
const express = require("express");
const accountsController = require("../../dist/controllers/accountsController");
const accountsService = require("../../dist/services/accountsService");
const accountsRouter = require("../../dist/routes/accountsRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/accountsService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/accounts", accountsRouter);


describe("POST /accounts/createaccount", () => {

    const mockAccount = [
        {
            userID: "1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            role: "learner",
        },
    ];

    it("should create an account and return 201 on success", async () => {

        accountsService.createAccount.mockResolvedValue(mockAccount);

        const response = await request(app)
            .post("/accounts/createaccount")
            .send(mockAccount);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockAccount[0].userID,
            status: 201,
            statusText: "Created",
        });
        expect(accountsService.createAccount).toHaveBeenCalledTimes(1);
        expect(accountsService.createAccount).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 and an error message on failure", async () => {

        const mockError = new Error("Database error");

        accountsService.createAccount.mockRejectedValue(mockError);

        const response = await request(app)
            .post("/accounts/createaccount")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to create ${mockAccount.role} account`,
        });
        expect(accountsService.createAccount).toHaveBeenCalledTimes(1);
        expect(accountsService.createAccount).toHaveBeenCalledWith(mockAccount);
    });
});


describe("GET /accounts/getallaccounts", () => {
    it("should return 200 and the list of accounts on success", async () => {
        const mockAccounts = [
            {
                userID: "1",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            },
            {
                userID: "2",
                firstName: "Jane",
                lastName: "Doe",
                email: "jane.doe@example.com",
            },
        ];

        accountsService.getAllAccounts.mockResolvedValue(mockAccounts);

        const response = await request(app).get("/accounts/getallaccounts");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccounts);
        expect(accountsService.getAllAccounts).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsService.getAllAccounts.mockRejectedValue(mockError);

        const response = await request(app).get("/accounts/getallaccounts");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve accounts",
        });
        expect(accountsService.getAllAccounts).toHaveBeenCalledTimes(1);
    });
});


describe("GET /accounts/getaccountbyid", () => {

    const mockAccounts = {
        userID: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
    };

    it("should return 200 and the account on success", async () => {

        accountsService.getAccountById.mockResolvedValue(mockAccounts);

        const response = await request(app).get(`/accounts/getaccountbyid/${mockAccounts.userID}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccounts);
        expect(accountsService.getAccountById).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsService.getAccountById.mockRejectedValue(mockError);

        const response = await request(app).get(`/accounts/getaccountbyid/${mockAccounts.userID}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve account",
        });
        expect(accountsService.getAccountById).toHaveBeenCalledTimes(1);
    });
});


describe("GET /accounts/getaccountsbyrole", () => {
    const mockAccounts = [
        {
            userID: "1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            role: "learner",
        },
        {
            userID: "2",
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            role: "learner",
        },
    ];

    it("should return 200 and the list of learner accounts on success", async () => {
        accountsService.getAccountsByRole.mockResolvedValue(mockAccounts);

        const response = await request(app).get("/accounts/getaccountsbyrole/learner");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccounts);
        expect(accountsService.getAccountsByRole).toHaveBeenCalledTimes(1);
    });

    it("should return 200 and the list of admin accounts on success", async () => {

        mockAccounts[0].role = "admin";
        mockAccounts[1].role = "admin";

        accountsService.getAccountsByRole.mockResolvedValue(mockAccounts);

        const response = await request(app).get("/accounts/getaccountsbyrole/admin");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAccounts);
        expect(accountsService.getAccountsByRole).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsService.getAccountsByRole.mockRejectedValue(mockError);

        const response = await request(app).get("/accounts/getaccountsbyrole/admin");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve all admin accounts`,
        });
        expect(accountsService.getAccountsByRole).toHaveBeenCalledTimes(1);
    });
});


describe("PATCH /accounts/updateaccount", () => {

    const mockAccount = {
        userID: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
    };

    it("should update an account and return 204 on success", async () => {
        const mockResponse = { status: 204, statusText: "OK" };

        accountsService.updateAccount.mockResolvedValue(mockResponse);

        const response = await request(app).patch("/accounts/updateaccount").send(mockAccount);

        expect(response.status).toBe(200);
        expect(response.body.statusText).toBe("Account Updated Successfully");
        expect(accountsService.updateAccount).toHaveBeenCalledTimes(1);
        expect(accountsService.updateAccount).toHaveBeenCalledWith(mockAccount);
    });

    it("should return 500 and an error message on failure", async () => {

        const mockError = new Error("Database error");

        accountsService.updateAccount.mockRejectedValue(mockError);

        const response = await request(app)
            .patch("/accounts/updateaccount")
            .send(mockAccount);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to update account",
        });
        expect(accountsService.updateAccount).toHaveBeenCalledTimes(1);
        expect(accountsService.updateAccount).toHaveBeenCalledWith(mockAccount);
    });
});


describe("DELETE /accounts/deleteaccount/:id", () => {

    const mockId = "1";

    it("should delete an account and return 200 on success", async () => {
        
        const mockResponse = { status: 204, statusText: "OK" };

        accountsService.deleteAccount.mockResolvedValue(mockResponse);

        const response = await request(app).delete(`/accounts/deleteaccount/${mockId}`);

        expect(response.status).toBe(200);
        expect(response.body.statusText).toBe("Account Deleted Successfully");
        expect(accountsService.deleteAccount).toHaveBeenCalledTimes(1);
        expect(accountsService.deleteAccount).toHaveBeenCalledWith(mockId);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        accountsService.deleteAccount.mockRejectedValue(mockError);

        const response = await request(app).delete(`/accounts/deleteaccount/${mockId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to delete account",
        });
        expect(accountsService.deleteAccount).toHaveBeenCalledTimes(1);
        expect(accountsService.deleteAccount).toHaveBeenCalledWith(mockId);
    });
});


