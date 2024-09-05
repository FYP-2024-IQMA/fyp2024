// unitController.test.js

const request = require("supertest");
const express = require("express");
const unitController = require("../../dist/controllers/unitController");
const unitService = require("../../dist/services/unitService");
const unitRouter = require("../../dist/routes/unitRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/unitService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/unit", unitRouter);

describe("GET /gettotalunit", () => {

    it("should return 200 and the no. of total unit in a section", async () => {
        unitService.getNoOfUnitPerSection.mockResolvedValue(5);

        const response = await request(app).get("/unit/gettotalunit/SEC0001");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(5);
        expect(unitService.getNoOfUnitPerSection).toHaveBeenCalledTimes(1);
    });


    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        unitService.getNoOfUnitPerSection.mockRejectedValue(mockError);

        const response = await request(app).get("/unit/gettotalunit/SEC0000");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to retrieve no. of unit of SEC0000`,
        });
        expect(unitService.getNoOfUnitPerSection).toHaveBeenCalledTimes(1);
    });
});

