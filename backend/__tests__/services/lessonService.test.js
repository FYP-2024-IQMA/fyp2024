const lessonService = require("../../dist/services/lessonService");
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


describe("getNoOfLessonPerUnit", () => {

    const mockCount = 2;
    const expectedResult = 2;

   it("should return the no. of completed lessons per unit", async () => {
       const sectionID = "SEC0001";
       const unitID = "UNIT0001";

        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: null });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        // Call the service function
        const result = await lessonService.getNoOfLessonPerUnit(sectionID, unitID);

        // Verifying the chain of calls
        expect(mockEq1).toHaveBeenCalledWith("sectionID", sectionID);
        expect(mockEq2).toHaveBeenCalledWith("unitID", unitID);

        // Check the result
        expect(result).toEqual(expectedResult);
   });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch completed no. of lessons per unit";

        const sectionID = "SEC0001";
        const unitID = "UNIT0001";

        // Mocking the chain of calls
        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ count: mockCount, error: new Error(errorMessage) });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });
        
        await expect(
            lessonService.getNoOfLessonPerUnit(sectionID, unitID)
        ).rejects.toThrow(errorMessage);
    
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

});

