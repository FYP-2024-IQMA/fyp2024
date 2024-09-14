const chatService = require("../../dist/services/chatService");
const supabase = require("../../dist/config/supabaseConfig");
const chatModel = require("../../dist/models/chatModel");

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

describe("createChats", () => {

    let mockData;

    beforeEach(() => {

        mockData = {
            userID: "USR0001",
            sectionID: "SEC0001",
            queryPair: [
                {
                    role: "user",
                    content: "Hello",
                },
                {
                    role: "assistant",
                    content: "Hi",
                },
            ],
        };

    });

    it("create a user chat history", async () => {
        const mockInsert = jest
            .fn()
            .mockResolvedValue({ error: null });
        supabase.from.mockReturnValue({ insert: mockInsert });

        const result = await chatService.createChats(mockData);

        expect(mockInsert).toHaveBeenCalledWith(mockData);

        expect(result).toEqual(mockData.userID);
    });

    it("should thrown an error when it passes in an invalid queryPair - wrong role (not user)", async () => {

        mockData.queryPair = [
            {
                role: "not user",
                content: "Hello",
            },
            {
                role: "assistant",
                content: "Hi",
            },
        ];

        const errorMessage = "Invalid QueryPair object:"

        const mockInsert = jest.fn().mockResolvedValue({
            error: null,
        });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(chatService.createChats(mockData)).rejects.toThrow(errorMessage);

        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(errorMessage));
    });

    it("should thrown an error when it passes in an invalid queryPair - wrong role (not assistant)", async () => {
        mockData.queryPair = [
            {
                role: "user",
                content: "Hello",
            },
            {
                role: "not assistant",
                content: "Hi",
            },
        ];

        const errorMessage = "Invalid QueryPair object:";

        const mockInsert = jest.fn().mockResolvedValue({
            error: null,
        });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(chatService.createChats(mockData)).rejects.toThrow(
            errorMessage
        );

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(errorMessage)
        );
    });

    it("should thrown an error when it passes in an invalid queryPair - wrong key", async () => {
        mockData.queryPair = [
            {
                role: "user",
                content: "Hello",
            },
            {
                role: "assistant",
                text: "Hi",
            },
        ];

        const errorMessage = "Invalid QueryPair object:";

        const mockInsert = jest.fn().mockResolvedValue({
            error: null,
        });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(chatService.createChats(mockData)).rejects.toThrow(
            errorMessage
        );

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining(errorMessage)
        );
    });

    it("should throw an error and log the error when there is a database error", async () => {
        const errorMessage = "Database Error";

        const mockInsert = jest
            .fn()
            .mockResolvedValue({ error: new Error(errorMessage) });
        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(chatService.createChats(mockData)).rejects.toThrow(
            errorMessage
        );

        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

});



/* READ */

describe("getChatHistory", () => {

    const userID = "USR0001";
    const sectionID = "SEC0001";

    const mockData = [
        {
            dateCreated: "2024-08-27T12:08:45.905447+00:00",
            queryPair: [
                {
                    role: "user",
                    content: "What type of communication modes are there?",
                },
                {
                    role: "assistant",
                    content: "verbal, non-verbal, written, visual, and digital",
                },
            ],
        },
        {
            dateCreated: "2024-08-27T12:09:56.448132+00:00",
            queryPair: [
                {
                    role: "user",
                    content: "Can you summarize each point",
                },
                {
                    role: "assistant",
                    content: "sure!",
                },
            ],
        },
    ];

    it("should return an array of a user's chat history", async () => {

        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await chatService.getChatHistory({ userID, sectionID });

        expect(result).toEqual(mockData);
    });


    it("should throw an error and log the error when there is an error from the database", async () => {
        const errorMessage = "Failed to fetch admin accounts";

        const mockEq2 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: new Error(errorMessage) });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            chatService.getChatHistory({ userID, sectionID })
        ).rejects.toThrow(errorMessage);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});


describe("getUnitChatHistory", () => {

    const userID = "USR0001";
    const sectionID = "SEC0001";
    const unitID = "UNIT0001";

    const mockData = [
        {
            dateCreated: "2024-08-27T12:08:45.905447+00:00",
            queryPair: [
                {
                    role: "user",
                    content: "What type of communication modes are there?",
                },
                {
                    role: "assistant",
                    content: "verbal, non-verbal, written, visual, and digital",
                },
            ],
        },
        {
            dateCreated: "2024-08-27T12:09:56.448132+00:00",
            queryPair: [
                {
                    role: "user",
                    content: "Can you summarize each point",
                },
                {
                    role: "assistant",
                    content: "sure!",
                },
            ],
        },
    ];

    it("should return an array of a user's chat history", async () => {

        const mockEq3 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: null });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await chatService.getUnitChatHistory({ userID, sectionID, unitID });

        expect(result).toEqual(mockData);
    });


    it("should throw an error and log the error when there is an error from the database", async () => {
        const errorMessage = "Failed to fetch admin accounts";

        const mockEq3 = jest
            .fn()
            .mockResolvedValue({ data: mockData, error: new Error(errorMessage) });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(
            chatService.getUnitChatHistory({ userID, sectionID })
        ).rejects.toThrow(errorMessage);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

/* DELETE */

describe("deleteChat", () => {

    const userID = "USR0001";
    const sectionID = "SEC0001";

    it("should delete the user's chat history successfully", async () => {


        const mockEq2 = jest.fn().mockResolvedValue({
            status: 204,
            statusText: "No Content",
            error: null,
        });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq1 });

        supabase.from.mockReturnValue({ delete: mockDelete });

        const result = await chatService.deleteChat({ userID, sectionID });

        expect(result).toEqual({ status: 204, statusText: "No Content" });
    });

    it("should throw an error and log the error when there is a database error", async () => {
        const errorMessage = "Database error";

        const mockEq2 = jest.fn().mockResolvedValue({
            status: null,
            statusText: null,
            error: new Error(errorMessage),
        });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockDelete = jest.fn().mockReturnValue({ eq: mockEq1 });

        supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(chatService.deleteChat({ userID, sectionID })).rejects.toThrow(
            errorMessage
        );
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});
