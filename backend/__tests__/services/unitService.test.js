const unitService = require("../../dist/services/unitService");
const supabase = require("../../dist/config/supabaseConfig");
const videoService = require("../../dist/services/videoService");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/videoService");

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

        const mockEq = jest.fn().mockResolvedValue({
            count: mockCount,
            error: new Error(errorMessage),
        });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            unitService.getNoOfUnitPerSection("SEC0000")
        ).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getAllUnitsBySection", () => {
    const rawResult = [
        {
            sectionID: "SEC0001",
            unitID: "UNIT0001",
            unitName: "Foundations of Communication",
            unitDescription:
                "🎉 Get ready to dive into the exciting world of communication!\r\n📚 Let's decode the mysteries of verbal and non-verbal signals, uncover the secrets of various communication styles, and embark on a journey through behavioral insights concepts to unlock the power of effective communication! 🚀",
            assessmentIntro:
                "🌟 Ready to level up your communication game? Dive into our ultimate cheat sheet packed with tips and tricks to decode the secret language of verbal and non-verbal signals!\r\n📚 From mastering tone and body language to recognizing diverse communication styles and behavioral insights, this guide is your passport to engaging and effective interactions.\r\nWhether you're looking to fine-tune your speaking style or understand others better, we've got you covered with essential insights and fun pointers. 🎯",
            realityCheck:
                "🎉 Welcome to the ultimate party mixer challenge!\r\n🎊 Get ready to navigate diverse conversations, decode communication styles, and master the art of making meaningful connections! 🚀",
            scenario:
                "Imagine you're attending a bustling networking event filled with professionals from various industries. As you navigate through the crowd, you notice people engaged in conversations, exchanging business cards, and forming connections.\r\nSuddenly, you spot a potential client across the room who seems disinterested in the conversation they're having. How do you approach them and effectively convey your message to capture their attention and leave a lasting impression?",
            dateCreated: "2024-08-18T14:59:01.549137+00:00",
        },
    ];

    const expectedResult = [
        {
            sectionID: "SEC0001",
            unitID: "UNIT0001",
            unitName: "Foundations of Communication",
            unitDescription: [
                "🎉 Get ready to dive into the exciting world of communication!",
                "📚 Let's decode the mysteries of verbal and non-verbal signals, uncover the secrets of various communication styles, and embark on a journey through behavioral insights concepts to unlock the power of effective communication! 🚀",
            ],
            assessmentIntro: [
                "🌟 Ready to level up your communication game? Dive into our ultimate cheat sheet packed with tips and tricks to decode the secret language of verbal and non-verbal signals!",
                "📚 From mastering tone and body language to recognizing diverse communication styles and behavioral insights, this guide is your passport to engaging and effective interactions.",
                "Whether you're looking to fine-tune your speaking style or understand others better, we've got you covered with essential insights and fun pointers. 🎯",
            ],
            realityCheck: [
                "🎉 Welcome to the ultimate party mixer challenge!",
                "🎊 Get ready to navigate diverse conversations, decode communication styles, and master the art of making meaningful connections! 🚀",
            ],
            scenario: [
                "Imagine you're attending a bustling networking event filled with professionals from various industries. As you navigate through the crowd, you notice people engaged in conversations, exchanging business cards, and forming connections.",
                "Suddenly, you spot a potential client across the room who seems disinterested in the conversation they're having. How do you approach them and effectively convey your message to capture their attention and leave a lasting impression?",
            ],
            dateCreated: "2024-08-18T14:59:01.549137+00:00",
        },
    ];

    it("returns all units of section", async () => {
        const mockEq = jest
            .fn()
            .mockResolvedValue({ data: rawResult, error: null });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await unitService.getAllUnitsBySection(
            rawResult[0].sectionID
        );

        expect(result).toEqual(expectedResult);
    });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch all units of Section";

        const mockEq = jest.fn().mockResolvedValue({
            data: expectedResult,
            error: new Error(errorMessage),
        });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            unitService.getAllUnitsBySection("SEC0056")
        ).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

describe("getUnitDetailsBySectionAndUnit", () => {
    const sectionID = "SEC0001";
    const unitID = "UNIT0001";

    const rawResult = {
        sectionID: "SEC0001",
        unitID: "UNIT0001",
        unitName: "Foundations of Communication",
        unitDescription:
            "🎉 Get ready to dive into the exciting world of communication!\r\n📚 Let's decode the mysteries of verbal and non-verbal signals, uncover the secrets of various communication styles, and embark on a journey through behavioral insights concepts to unlock the power of effective communication! 🚀",
        assessmentIntro:
            "🌟 Ready to level up your communication game? Dive into our ultimate cheat sheet packed with tips and tricks to decode the secret language of verbal and non-verbal signals!\r\n📚 From mastering tone and body language to recognizing diverse communication styles and behavioral insights, this guide is your passport to engaging and effective interactions.\r\nWhether you're looking to fine-tune your speaking style or understand others better, we've got you covered with essential insights and fun pointers. 🎯",
        realityCheck:
            "🎉 Welcome to the ultimate party mixer challenge!\r\n🎊 Get ready to navigate diverse conversations, decode communication styles, and master the art of making meaningful connections! 🚀",
        scenario:
            "Imagine you're attending a bustling networking event filled with professionals from various industries. As you navigate through the crowd, you notice people engaged in conversations, exchanging business cards, and forming connections.\r\nSuddenly, you spot a potential client across the room who seems disinterested in the conversation they're having. How do you approach them and effectively convey your message to capture their attention and leave a lasting impression?",
        dateCreated: "2024-08-18T14:59:01.549137+00:00",
    };
    const expectedResult = {
        sectionID: "SEC0001",
        unitID: "UNIT0001",
        unitName: "Foundations of Communication",
        unitDescription: [
            "🎉 Get ready to dive into the exciting world of communication!",
            "📚 Let's decode the mysteries of verbal and non-verbal signals, uncover the secrets of various communication styles, and embark on a journey through behavioral insights concepts to unlock the power of effective communication! 🚀",
        ],
        assessmentIntro: [
            "🌟 Ready to level up your communication game? Dive into our ultimate cheat sheet packed with tips and tricks to decode the secret language of verbal and non-verbal signals!",
            "📚 From mastering tone and body language to recognizing diverse communication styles and behavioral insights, this guide is your passport to engaging and effective interactions.",
            "Whether you're looking to fine-tune your speaking style or understand others better, we've got you covered with essential insights and fun pointers. 🎯",
        ],
        realityCheck: [
            "🎉 Welcome to the ultimate party mixer challenge!",
            "🎊 Get ready to navigate diverse conversations, decode communication styles, and master the art of making meaningful connections! 🚀",
        ],
        realityCheckURL: "https://realityCheckURL.mp4",
        cheatSheetAudio: "https://cheatSheetAudio.mp3",
        scenario: [
            "Imagine you're attending a bustling networking event filled with professionals from various industries. As you navigate through the crowd, you notice people engaged in conversations, exchanging business cards, and forming connections.",
            "Suddenly, you spot a potential client across the room who seems disinterested in the conversation they're having. How do you approach them and effectively convey your message to capture their attention and leave a lasting impression?",
        ],
        dateCreated: "2024-08-18T14:59:01.549137+00:00",
    };

    it("returns unit details of section and unit", async () => {
        const mockSingle = jest
            .fn()
            .mockResolvedValue({ data: rawResult, error: null });

        const mockEq2 = jest.fn().mockReturnValue({ single: mockSingle });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });

        supabase.from.mockReturnValue({ select: mockSelect });

        videoService.formatVideoUrl
            .mockReturnValueOnce("https://realityCheckURL.mp4")
            .mockReturnValueOnce("https://cheatSheetAudio.mp3");

        const result = await unitService.getUnitDetailsBySectionAndUnit({
            sectionID,
            unitID,
        });
        expect(result).toEqual(expectedResult);
    });

    it("should throw an error when there is an error from supabase", async () => {
        const errorMessage = "Failed to fetch unit details of Section and Unit";

        const mockSingle = jest.fn().mockResolvedValue({
            data: expectedResult,
            error: new Error(errorMessage),
        });
        const mockEq2 = jest.fn().mockReturnValue({ single: mockSingle });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });

        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            unitService.getUnitDetailsBySectionAndUnit("SEC0056")
        ).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });
});
