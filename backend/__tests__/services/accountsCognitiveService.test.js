const supabase = require("../../dist/config/supabaseConfig");
const accountsCognitiveService = require("../../dist/services/accountsCognitiveService");

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
describe("createAccountCognitive", () => {
    const mockAccount = {
        userID: "xxx",
        educationalLevel: "Some college",
        languageAbilities: "Basic",
        learningPreferences: "Reading/Writing",
        litNumProficiency: "Basic",
        priorKnowledge: "None"
    };

    it("should create a cognitive account and return the created data", async () => {
        const mockSelect = jest.fn().mockResolvedValue({ data: [mockAccount], error: null });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });

        supabase.from.mockReturnValue({
            insert: mockInsert
        });

        const result = await accountsCognitiveService.createAccountCognitive(mockAccount);

        expect(supabase.from).toHaveBeenCalledWith("accountscognitive");
        expect(mockInsert).toHaveBeenCalledWith(mockAccount);
        expect(result).toEqual([mockAccount]);
    });



    it("should throw an error if creation fails", async () => {
        const mockError = new Error("Database error");
        const mockSelect = jest.fn().mockReturnValue({ data: null, error: mockError });
        const mockInsert = jest.fn().mockReturnValue({ select: mockSelect });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(accountsCognitiveService.createAccountCognitive(mockAccount)).rejects.toThrow(mockError);
    });
});

/* READ */
describe("getAccountCognitiveById", () => {
    const mockAccount = {
        userID: "xxx",
        educationalLevel: "Some college",
        languageAbilities: "Basic",
        learningPreferences: "Reading/Writing",
        litNumProficiency: "Basic",
        priorKnowledge: "None"
    };

    it("should retrieve the cognitive account by ID", async () => {
        const mockSingle = jest.fn().mockResolvedValue({ data: mockAccount, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await accountsCognitiveService.getAccountCognitiveById("xxx");

        expect(result).toEqual(mockAccount);
        expect(supabase.from).toHaveBeenCalledWith("accountscognitive");
        expect(mockSelect).toHaveBeenCalledWith("*");
    });

    it("should throw an error if retrieval fails", async () => {
        const mockError = new Error("Database error");
        const mockSingle = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });

        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(accountsCognitiveService.getAccountCognitiveById("xxx")).rejects.toThrow(mockError);
    });
});

/* DELETE */
describe("deleteAccountCognitive", () => {
    it("should delete the cognitive account by ID and return the status", async () => {

        const mockEq = jest.fn().mockResolvedValue({ status: 200, statusText: "OK", error: null });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ delete: mockDelete });

        const result = await accountsCognitiveService.deleteAccountCognitive("xxx");

        expect(supabase.from).toHaveBeenCalledWith("accountscognitive");
        expect(mockEq).toHaveBeenCalledWith("userID", "xxx");
        expect(result).toEqual({ status: 200, statusText: "OK" });
    });

    it("should throw an error if deletion fails", async () => {
        const mockError = new Error("Database error");
        const mockEq = jest.fn().mockResolvedValue({ status: null, error: mockError });

        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });

        supabase.from.mockReturnValue({ delete: mockDelete }); supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(accountsCognitiveService.deleteAccountCognitive("xxx")).rejects.toThrow(mockError);
    });
});
