// chatController.test.js

const request = require("supertest");
const express = require("express");
const chatController = require("../../dist/controllers/chatController");
const chatService = require("../../dist/services/chatService");
const chatRouter = require("../../dist/routes/chatRouter").default;
const supabase = require("../../dist/config/supabaseConfig");

jest.mock("../../dist/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

jest.mock("../../dist/services/chatService");

beforeEach(() => {
    jest.resetAllMocks();
});

const app = express();
app.use(express.json());
app.use("/chat", chatRouter);

/* CREATE */

describe("POST /createchathistory", () => {
    const mockData = {
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

    it("should create an account and return 201 on success", async () => {
        chatService.createChats.mockResolvedValue(mockData.userID);

        const response = await request(app)
            .post("/chat/createchathistory")
            .send(mockData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            userID: mockData.userID,
            sectionID: mockData.sectionID,
            status: 201,
            statusText: "Created",
        });
        expect(chatService.createChats).toHaveBeenCalledTimes(1);
        expect(chatService.createChats).toHaveBeenCalledWith(mockData);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        chatService.createChats.mockRejectedValue(mockError);

        const response = await request(app)
            .post("/chat/createchathistory")
            .send(mockData);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: `Failed to insert chat history`,
        });
        expect(chatService.createChats).toHaveBeenCalledTimes(1);
        expect(chatService.createChats).toHaveBeenCalledWith(mockData);
    });
});

/* READ */

describe("GET /chat/getchathistory/:userid/:sectionid", () => {

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
                    content:
                        "verbal, non-verbal, written, visual, and digital",
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
    
    it("should return 200 and the list of chat on success", async () => {

        chatService.getChatHistory.mockResolvedValue(mockData);

        const response = await request(app).get(`/chat/getchathistory/${userID}/${sectionID}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
        expect(chatService.getChatHistory).toHaveBeenCalledTimes(1);
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");

        chatService.getChatHistory.mockRejectedValue(mockError);

        const response = await request(app).get(`/chat/getchathistory/${userID}/${sectionID}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to retrieve chat history",
        });
        expect(chatService.getChatHistory).toHaveBeenCalledTimes(1);
    });
});


/* DELETE */

describe("DELETE /deletechathistory/:userid/:sectionid", () => {
    
    const userID = "USR0001";
    const sectionID = "SEC0001";

    it("should delete user chat history and return 200 on success", async () => {
        const mockResponse = { status: 204, statusText: "OK" };

        chatService.deleteChat.mockResolvedValue(mockResponse);

        const response = await request(app).delete(
            `/chat/deletechathistory/${userID}/${sectionID}`
        );

        expect(response.status).toBe(200);
        expect(response.body.statusText).toBe("Chat History Deleted Successfully");
        expect(chatService.deleteChat).toHaveBeenCalledTimes(1);
        expect(chatService.deleteChat).toHaveBeenCalledWith({ userID, sectionID });
    });

    it("should return 500 and an error message on failure", async () => {
        const mockError = new Error("Database error");
        mockError.code = 500;

        chatService.deleteChat.mockRejectedValue(mockError);

        const response = await request(app).delete(
            `/chat/deletechathistory/${userID}/${sectionID}`
        );

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            error: "Failed to delete chat history",
        });
        expect(chatService.deleteChat).toHaveBeenCalledTimes(1);
        expect(chatService.deleteChat).toHaveBeenCalledWith({
            userID,
            sectionID,
        });
    });
});
