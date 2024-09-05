const unitService = require("../../dist/services/unitService");
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});


describe("getNoOfUnitPerSection", () => {
    const mockCount = 2;
    const expectedResult = 2;

    it("should return the total no. of unit in a section", async () => {
        const mockEq = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: null });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await unitService.getNoOfUnitPerSection("SEC0001");

        expect(result).toEqual(expectedResult);
    });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch total no. of unit per section";

        const mockEq = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: new Error(errorMessage) });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(unitService.getNoOfUnitPerSection("SEC0000")).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

