const supabase = require("../../dist/config/supabaseConfig");
const accountsAffectiveService = require("../../dist/services/accountsAffectiveService");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn()
}));

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

/* CREATE */
describe("createAccountAffective", () => {
    const mockAccount = {
        userID: "xx",
        attitude: "Positive",
        barriers: ["Time"],
        motivationalLevel: "High",
        personality: "Extroverted",
        reasons: ["Skill development"]
    };

    it("should create an account and return the created account data", async () => {
        const mockSelect = jest.fn().mockResolvedValue({ data: [mockAccount], error: null });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });
        supabase.from.mockReturnValue({ insert: mockInsert });

        const result = await accountsAffectiveService.createAccountAffective(mockAccount);

        expect(mockInsert).toHaveBeenCalledWith(mockAccount);
        expect(result).toEqual([mockAccount]);
    });

    it("should throw an error if the creation fails", async () => {
        const mockError = new Error("Database error");
        const mockSelect = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(accountsAffectiveService.createAccountAffective(mockAccount)).rejects.toThrow(mockError);
    });
});

/* READ */
describe("getAccountAffectiveById", () => {
    const mockAccount = {
        userID: "xx",
        attitude: "Positive",
        barriers: ["Time"],
        motivationalLevel: "High",
        personality: "Extroverted",
        reasons: ["Skill development"]
    };

    it("should retrieve the account by ID", async () => {
        const mockSingle = jest.fn().mockResolvedValue({ data: mockAccount, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsAffectiveService.getAccountAffectiveById("xx");

        expect(result).toEqual(mockAccount);
        expect(supabase.from).toHaveBeenCalledWith("accountsaffective");
        expect(mockSelect).toHaveBeenCalledWith("*");
    });

    it("should throw an error if retrieval fails", async () => {
        const mockError = new Error("Database error");
        const mockSingle = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(accountsAffectiveService.getAccountAffectiveById("xx")).rejects.toThrow(mockError);
    });
});

/* DELETE */
describe("deleteAccountAffective", () => {
    it("should delete the account by ID and return the status", async () => {
        const mockEq = jest.fn().mockResolvedValue({ status: 200, statusText: "OK", error: null });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ delete: mockDelete });

        const result = await accountsAffectiveService.deleteAccountAffective("xx");

        expect(supabase.from).toHaveBeenCalledWith("accountsaffective");
        expect(mockEq).toHaveBeenCalledWith("userID", "xx");
        expect(result).toEqual({ status: 200, statusText: "OK" });
    });

    it("should throw an error if deletion fails", async () => {
        const mockError = new Error("Database error");
        const mockEq = jest.fn().mockResolvedValue({ status: null, error: mockError });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(accountsAffectiveService.deleteAccountAffective("xx")).rejects.toThrow(mockError);
    });
});
