const supabase = require("../../dist/config/supabaseConfig");
const accountsDemographicsService = require("../../dist/services/accountsDemographicsService");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
});

/* CREATE */
describe("createAccountDemographics", () => {
    const mockAccount = {
        userID: "xxx",
        careerStage: "Builder",
        ethnicGroup: "Malay",
        jobCategory: "Senior-level",
        lifeStage: "Late career",
        race: "Asian",
        specialNeeds: "Other"
    };

    const expectedResult = [mockAccount];

    it("should create a demographics account and return the created data", async () => {
        const mockSelect = jest.fn().mockResolvedValue({ data: expectedResult, error: null });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });

        supabase.from.mockReturnValue({ insert: mockInsert });

        const result = await accountsDemographicsService.createAccountDemographics(mockAccount);

        expect(supabase.from).toHaveBeenCalledWith("accountsdemographics");
        expect(mockInsert).toHaveBeenCalledWith(mockAccount);
        expect(result).toEqual(expectedResult);
    });

    it("should throw an error if creation fails", async () => {
        const mockError = new Error("Database error");
        const mockSelect = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });

        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(accountsDemographicsService.createAccountDemographics(mockAccount)).rejects.toThrow(mockError);
    });
});

/* READ */
describe("getAccountDemographicsById", () => {
    const mockAccount = {
        userID: "xxx",
        careerStage: "Builder",
        ethnicGroup: "Malay",
        jobCategory: "Senior-level",
        lifeStage: "Late career",
        race: "Asian",
        specialNeeds: "Other"
    };

    it("should retrieve the demographics account by ID", async () => {
        const mockSingle = jest.fn().mockResolvedValue({ data: mockAccount, error: null });

        const mockEq = jest.fn().mockReturnValue({
            single: mockSingle
        });

        const mockSelect = jest.fn().mockReturnValue({
            eq: mockEq
        });

        supabase.from.mockReturnValue({
            select: mockSelect
        });

        const result = await accountsDemographicsService.getAccountDemographicsById("xxx");

        expect(result).toEqual(mockAccount);
        expect(supabase.from).toHaveBeenCalledWith("accountsdemographics");
        expect(mockSelect).toHaveBeenCalledWith("*");
    });


    it("should throw an error if retrieval fails", async () => {
        const mockError = new Error("Database error");

        const mockSingle = jest.fn().mockResolvedValue({
            data: null,
            error: mockError // Return the error here
        });

        const mockEq = jest.fn().mockReturnValue({
            single: mockSingle
        });

        const mockSelect = jest.fn().mockReturnValue({
            eq: mockEq
        });

        supabase.from.mockReturnValue({
            select: mockSelect
        });

        await expect(accountsDemographicsService.getAccountDemographicsById("xxx")).rejects.toThrow(mockError);
    });

});

/* DELETE */
describe("deleteAccountDemographics", () => {
    it("should delete the demographics account by ID and return the status", async () => {
        const mockEq = jest.fn().mockResolvedValue({ status: 200, statusText: "OK", error: null });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete });

        const result = await accountsDemographicsService.deleteAccountDemographics("xxx");

        expect(supabase.from).toHaveBeenCalledWith("accountsdemographics");
        expect(mockEq).toHaveBeenCalledWith("userID", "xxx");
        expect(result).toEqual({ status: 200, statusText: "OK" });
    });

    it("should throw an error if deletion fails", async () => {
        const mockError = new Error("Database error");
        const mockEq = jest.fn().mockResolvedValue({ status: null, error: mockError });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(accountsDemographicsService.deleteAccountDemographics("xxx")).rejects.toThrow(mockError);
    });
});
