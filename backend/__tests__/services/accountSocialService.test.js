const supabase = require("../../dist/config/supabaseConfig");
const accountsSocialService = require("../../dist/services/accountsSocialService");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
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
describe("createAccountSocial", () => {
    const mockAccount = {
        userID: "xx",
        compLiteracy: "Basic",
        relationshipToPeers: "Competitive",
        socialBackground: "Urban",
        tendency: "Introverted"
    };

    it("should create a social account and return the created account data", async () => {
        const mockSelect = jest.fn().mockResolvedValue({ data: [mockAccount], error: null });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });

        supabase.from.mockReturnValue({ insert: mockInsert });

        const result = await accountsSocialService.createAccountSocial(mockAccount);

        expect(mockInsert).toHaveBeenCalledWith(mockAccount);
        expect(result).toEqual([mockAccount]);
    });

    it("should throw an error if creation fails", async () => {
        const mockError = new Error("Database error");
        const mockSelect = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });

        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(accountsSocialService.createAccountSocial(mockAccount)).rejects.toThrow(mockError);
    });
});

/* READ */
describe("getAccountSocialById", () => {
    const mockAccount = {
        userID: "xx",
        compLiteracy: "Basic",
        relationshipToPeers: "Competitive",
        socialBackground: "Urban",
        tendency: "Introverted"
    };

    it("should retrieve the account by ID", async () => {
        const mockSingle = jest.fn().mockResolvedValue({ data: mockAccount, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsSocialService.getAccountSocialById("xx");

        expect(result).toEqual(mockAccount);
        expect(supabase.from).toHaveBeenCalledWith("accountssocial");
        expect(mockSelect).toHaveBeenCalledWith("*");
        expect(mockEq).toHaveBeenCalledWith("userID", "xx");
    });

    it("should throw an error if retrieval fails", async () => {
        const mockError = new Error("Database error");
        const mockSingle = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(accountsSocialService.getAccountSocialById("xx")).rejects.toThrow(mockError);
    });
});

/* UPDATE */
describe("updateAccountSocial", () => {
    const mockAccount = {
        userID: "xx",
        compLiteracy: "Advanced",
        relationshipToPeers: "Collaborative",
        socialBackground: "Urban",
        tendency: "Extroverted"
    };

    it("should update the social account and return status 200 on success", async () => {
        const mockEq = jest.fn().mockResolvedValue({ status: 200, statusText: "OK", error: null });
        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ update: mockUpdate });

        const result = await accountsSocialService.updateAccountSocial(mockAccount);

        expect(mockUpdate).toHaveBeenCalledWith({
            compLiteracy: mockAccount.compLiteracy,
            relationshipToPeers: mockAccount.relationshipToPeers,
            socialBackground: mockAccount.socialBackground,
            tendency: mockAccount.tendency
        });
        expect(mockEq).toHaveBeenCalledWith("userID", mockAccount.userID);
        expect(result).toEqual({ status: 200, statusText: "OK" });
    });

    it("should throw an error if update fails", async () => {
        const mockError = new Error("Database error");
        const mockEq = jest.fn().mockResolvedValue({ status: null, error: mockError });
        const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ update: mockUpdate });

        await expect(accountsSocialService.updateAccountSocial(mockAccount)).rejects.toThrow(mockError);
    });
});

/* DELETE */
describe("deleteAccountSocial", () => {
    it("should delete the social account by ID and return status 200", async () => {
        const mockEq = jest.fn().mockResolvedValue({ status: 200, statusText: "OK", error: null });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete });

        const result = await accountsSocialService.deleteAccountSocial("xx");

        expect(supabase.from).toHaveBeenCalledWith("accountssocial");
        expect(mockEq).toHaveBeenCalledWith("userID", "xx");
        expect(result).toEqual({ status: 200, statusText: "OK" });
    });

    it("should throw an error if deletion fails", async () => {
        const mockError = new Error("Database error");
        const mockEq = jest.fn().mockResolvedValue({ status: null, error: mockError });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(accountsSocialService.deleteAccountSocial("xx")).rejects.toThrow(mockError);
    });
});
