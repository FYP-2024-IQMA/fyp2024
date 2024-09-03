const sectionService = require("../../dist/services/sectionService");
const supabase = require("../../dist/config/supabaseConfig");

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

describe("getSectionDetails", () => {
    const mockSection = {
        sectionID: 'SEC0001',
        sectionName: 'Communication',
        sectionDescription: null,
        introductionURL: 'https://youtube.com/shorts/pU4fCakueEE?si=AbLsf_OkPRZ-TLWq',
        finalAssessmentIntro: "Welcome to the Grand Presentation Showdown...",
        finalScenario: "You are part of a team participating in a high-stakes competition...",
        dateCreated: '2024-08-18T14:59:01.549137+00:00'
    };

    it("should return section details on success", async () => {
        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: mockSection, error: null });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await sectionService.getSectionDetails('SEC0001');

        expect(result).toEqual(mockSection);
        expect(supabase.from).toHaveBeenCalledWith("section");
        expect(mockSelect).toHaveBeenCalledWith("*");
        expect(mockEq).toHaveBeenCalledWith("sectionID", 'SEC0001');
        expect(mockSingle).toHaveBeenCalled();
    });

    it("should throw an error and log the error when there is a database error", async () => {
        const errorMessage = "Failed to fetch section details";

        const mockSingle = jest
            .fn()
            .mockResolvedValue({
                data: null,
                error: new Error(errorMessage),
            });
        const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            sectionService.getSectionDetails("SEC0001")
        ).rejects.toThrow(errorMessage);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getAllSections", () => {
    const mockSections = [
        {
            sectionID: 'SEC0001',
            sectionName: 'Communication',
            sectionDescription: null,
            introductionURL: 'pU4fCakueEE',
            finalAssessmentIntro: "Welcome to the Grand Presentation Showdown...",
            finalScenario: "You are part of a team participating in a high-stakes competition...",
            dateCreated: '2024-08-18T14:59:01.549137+00:00'
        },
        {
            sectionID: 'SEC0002',
            sectionName: 'Team Collaboration',
            sectionDescription: 'Learn how to work effectively in teams.',
            introductionURL: 'abc12345xyz',
            finalAssessmentIntro: "This is your team collaboration challenge...",
            finalScenario: "Your team must create a project plan under a tight deadline...",
            dateCreated: '2024-08-20T14:59:01.549137+00:00'
        }
    ];

    it("should return all sections with formatted URLs on success", async () => {
        const mockSelect = jest
            .fn()
            .mockResolvedValue({ data: mockSections, error: null });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await sectionService.getAllSections();

        expect(result).toEqual(mockSections);
        expect(supabase.from).toHaveBeenCalledWith("section");
        expect(mockSelect).toHaveBeenCalledWith("*");
    });

    it("should throw an error and log the error when there is a database error", async () => {
        const errorMessage = "Failed to fetch sections";

        const mockSelect = jest
            .fn()
            .mockResolvedValue({
                data: null,
                error: new Error(errorMessage),
            });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            sectionService.getAllSections()
        ).rejects.toThrow(errorMessage);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});
