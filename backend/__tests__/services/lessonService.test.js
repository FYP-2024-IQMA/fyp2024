const lessonService = require("../../dist/services/lessonService");
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

        const result = await lessonService.getNoOfLessonPerUnit(sectionID, unitID);

        expect(mockEq1).toHaveBeenCalledWith("sectionID", sectionID);
        expect(mockEq2).toHaveBeenCalledWith("unitID", unitID);

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

describe("getLesson", () => {
    const mockLesson1a = {
        "sectionID": "SEC0001",
        "unitID": "UNIT0001",
        "lessonID": "1a",
        "lessonName": "Lesson 1a: Understanding Verbal and Non-verbal Signals",
        "lessonURL": "https://youtu.be/4_5dayHDdBk?si=Jzg2RUbZ1S56eRXl&t=6",
        "lessonDuration": 3.44,
        "lessonText": null,
        "lessonDescription": "🎤👀 Communication isn't just about what we say; it's also about how we say it!\r\n✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. \r\nLearn to decipher these hidden messages and become a communication wizard! 🧙‍♂️",
        "lessonKeyTakeaway": "Verbal and non-verbal signals play crucial roles in communication, often conveying messages beyond words alone.\r\nVerbal signals encompass spoken language, including tone, pitch, and volume, which can convey emotions and intentions.\r\nNon-verbal signals, on the other hand, involve body language, facial expressions, gestures, and eye contact, providing additional context to verbal communication.\r\nUnderstanding both types of signals enhances communication effectiveness by allowing individuals to interpret and respond appropriately to the complete message being conveyed.",
        "lessonCheatSheet": "🗣️ Verbal Signals:\r\n🎶 Tone of Voice: Emotions can be conveyed through variations in pitch, volume, and intonation.\r\n📚 Word Choice: Different words can evoke different reactions and meanings.\r\n🏃‍♂️ Pace: The speed at which someone speaks can indicate excitement, nervousness, or boredom.\r\n👁️ Non-verbal Signals:\r\n🕺 Body Language: Posture, gestures, and facial expressions can speak volumes without saying a word.\r\n👀 Eye Contact: The level of eye contact can convey confidence, interest, or discomfort.\r\n🌍 Personal Space: Respect for personal space varies across cultures and can affect communication dynamics.",
        "dateCreated": "2024-08-18T14:59:11.210043+00:00"
    };

    const mockLesson1b = {
        "sectionID": "SEC0001",
        "unitID": "UNIT0001",
        "lessonID": "1b",
        "lessonName": "Lesson 1b: Recognizing and Interpreting Different Communication Styles",
        "lessonURL": "https://youtu.be/li4mCDH0eUE?si=iVS59MoIeK4SdDDs&t=17",
        "lessonDuration": 4.45,
        "lessonText": null,
        "lessonDescription": "🕵️‍♀️ Ever wonder why some people just \"get\" each other while others seem to be speaking different languages?\r\n🎭 Explore the quirky world of communication styles - from the analytical thinkers to the expressive artists, and everything in between!\r\nUnravel the mysteries of these diverse styles and learn how to adapt your communication to connect with anyone, anywhere! 🔍",
        "lessonKeyTakeaway": "Communication styles vary widely among individuals and cultures, influencing how messages are conveyed and received. Four primary communication styles include analytical, expressive, amiable, and driver.\r\nAnalytical communicators prioritize facts and logic, while expressive communicators focus on emotions and relationships.\r\nAmiable communicators prioritize harmony and cooperation, while driver communicators emphasize results and efficiency.\r\nRecognizing these styles enables individuals to adapt their communication approach to suit the preferences and needs of different audiences, fostering clearer understanding and stronger connections.",
        "lessonCheatSheet": "Analytical Style:\r\n📊 Focuses on facts, logic, and precision.\r\n📋 Prefers organized and structured communication.\r\nExpressive Style:\r\n🎭 Emphasizes emotions, creativity, and storytelling. \r\n🎤 Enjoys engaging with others and sharing personal experiences. \r\nAmiable Style:\r\n🤝 Prioritizes harmony, cooperation, and relationship-building.\r\n❤️ Values empathy and understanding in communication.\r\nDriver Style:\r\n🎯 Direct, assertive, and goal-oriented.\r\n⏱️ Prefers efficiency and results-driven communication.",
        "dateCreated": "2024-08-18T14:59:11.210043+00:00"
    }

    const mockLesson1c = {
        "sectionID": "SEC0001",
        "unitID": "UNIT0001",
        "lessonID": "1c",
        "lessonName": "Lesson 1c: Evaluating Behavioral Insights Concepts in Communication",
        "lessonURL": "https://www.youtube.com/watch?v=CG8m8hoq-hc",
        "lessonDuration": 5.08,
        "lessonText": null,
        "lessonDescription": "🚀 Prepare for an epic journey into the depths of human behavior!\r\n💡 Discover the secrets behind why we do what we do, from the power of social proof to the magic of reciprocity. Armed with these insights, you'll be equipped to craft messages that captivate hearts, sway minds, and spark action!\r\nIt's time to unleash your inner communicator extraordinaire! 🧠💥",
        "lessonKeyTakeaway": "Behavioral insights concepts offer valuable insights into human behavior and decision-making processes, enhancing communication effectiveness.\r\nConcepts such as social proof, reciprocity, and anchoring influence how individuals perceive and respond to messages.\r\nUnderstanding these concepts enables communicators to craft more persuasive and influential messages, whether in marketing, negotiation, or everyday interactions.\r\nBy incorporating behavioral insights into communication strategies, individuals can engage audiences more effectively, evoke desired responses, and ultimately achieve their communication goals with greater success.",
        "lessonCheatSheet": "👥 Social Proof: People are influenced by the actions and behaviors of others.\r\n🔄 Reciprocity: The tendency to feel obligated to return a favor after receiving one.\r\n🌱 Anchoring: The tendency to rely heavily on the first piece of information encountered when making decisions.\r\n🖼️ Framing: How information is presented can influence perception and decision-making.",
        "dateCreated": "2024-08-18T14:59:11.210043+00:00"
    }

    const expectedLesson1a = {
        "sectionID": "SEC0001",
        "unitID": "UNIT0001",
        "lessonID": "1a",
        "lessonName": "Lesson 1a: Understanding Verbal and Non-verbal Signals",
        "lessonURL": "4_5dayHDdBk",
        "lessonDuration": 3.44,
        "lessonText": null,
        "lessonDescription": [
            "🎤👀 Communication isn't just about what we say; it's also about how we say it!",
            "✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. ",
            "Learn to decipher these hidden messages and become a communication wizard! 🧙‍♂️"
        ],
        "lessonKeyTakeaway": [
            "Verbal and non-verbal signals play crucial roles in communication, often conveying messages beyond words alone.",
            "Verbal signals encompass spoken language, including tone, pitch, and volume, which can convey emotions and intentions.",
            "Non-verbal signals, on the other hand, involve body language, facial expressions, gestures, and eye contact, providing additional context to verbal communication.",
            "Understanding both types of signals enhances communication effectiveness by allowing individuals to interpret and respond appropriately to the complete message being conveyed."
        ],
        "lessonCheatSheet": {
            "🗣️ Verbal Signals:": [
                "🎶 Tone of Voice: Emotions can be conveyed through variations in pitch, volume, and intonation.",
                "📚 Word Choice: Different words can evoke different reactions and meanings.",
                "🏃‍♂️ Pace: The speed at which someone speaks can indicate excitement, nervousness, or boredom."
            ],
            "👁️ Non-verbal Signals:": [
                "🕺 Body Language: Posture, gestures, and facial expressions can speak volumes without saying a word.",
                "👀 Eye Contact: The level of eye contact can convey confidence, interest, or discomfort.",
                "🌍 Personal Space: Respect for personal space varies across cultures and can affect communication dynamics."
            ]
        },
        "dateCreated": "2024-08-18T14:59:11.210043+00:00"
    };

    const expectedLesson1b = {
        "sectionID": "SEC0001",
        "unitID": "UNIT0001",
        "lessonID": "1b",
        "lessonName": "Lesson 1b: Recognizing and Interpreting Different Communication Styles",
        "lessonURL": "li4mCDH0eUE",
        "lessonDuration": 4.45,
        "lessonText": null,
        "lessonDescription": [
            "🕵️‍♀️ Ever wonder why some people just \"get\" each other while others seem to be speaking different languages?",
            "🎭 Explore the quirky world of communication styles - from the analytical thinkers to the expressive artists, and everything in between!",
            "Unravel the mysteries of these diverse styles and learn how to adapt your communication to connect with anyone, anywhere! 🔍"
        ],
        "lessonKeyTakeaway": [
            "Communication styles vary widely among individuals and cultures, influencing how messages are conveyed and received. Four primary communication styles include analytical, expressive, amiable, and driver.",
            "Analytical communicators prioritize facts and logic, while expressive communicators focus on emotions and relationships.",
            "Amiable communicators prioritize harmony and cooperation, while driver communicators emphasize results and efficiency.",
            "Recognizing these styles enables individuals to adapt their communication approach to suit the preferences and needs of different audiences, fostering clearer understanding and stronger connections."
        ],
        "lessonCheatSheet": {
            "Analytical Style:": [
                "📊 Focuses on facts, logic, and precision.",
                "📋 Prefers organized and structured communication."
            ],
            "Expressive Style:": [
                "🎭 Emphasizes emotions, creativity, and storytelling.",
                "🎤 Enjoys engaging with others and sharing personal experiences."
            ],
            "Amiable Style:": [
                "🤝 Prioritizes harmony, cooperation, and relationship-building.",
                "❤️ Values empathy and understanding in communication."
            ],
            "Driver Style:": [
                "🎯 Direct, assertive, and goal-oriented.",
                "⏱️ Prefers efficiency and results-driven communication."
            ]
        },
        "dateCreated": "2024-08-18T14:59:11.210043+00:00"
    };

    const expectedLesson1c = {
        "sectionID": "SEC0001",
        "unitID": "UNIT0001",
        "lessonID": "1c",
        "lessonName": "Lesson 1c: Evaluating Behavioral Insights Concepts in Communication",
        "lessonURL": "CG8m8hoq-hc",
        "lessonDuration": 5.08,
        "lessonText": null,
        "lessonDescription": [
            "🚀 Prepare for an epic journey into the depths of human behavior!",
            "💡 Discover the secrets behind why we do what we do, from the power of social proof to the magic of reciprocity. Armed with these insights, you'll be equipped to craft messages that captivate hearts, sway minds, and spark action!",
            "It's time to unleash your inner communicator extraordinaire! 🧠💥"
        ],
        "lessonKeyTakeaway": [
            "Behavioral insights concepts offer valuable insights into human behavior and decision-making processes, enhancing communication effectiveness.",
            "Concepts such as social proof, reciprocity, and anchoring influence how individuals perceive and respond to messages.",
            "Understanding these concepts enables communicators to craft more persuasive and influential messages, whether in marketing, negotiation, or everyday interactions.",
            "By incorporating behavioral insights into communication strategies, individuals can engage audiences more effectively, evoke desired responses, and ultimately achieve their communication goals with greater success."
        ],
        "lessonCheatSheet": [
            "👥 Social Proof: People are influenced by the actions and behaviors of others.",
            "🔄 Reciprocity: The tendency to feel obligated to return a favor after receiving one.",
            "🌱 Anchoring: The tendency to rely heavily on the first piece of information encountered when making decisions.",
            "🖼️ Framing: How information is presented can influence perception and decision-making."
        ],
        "dateCreated": "2024-08-18T14:59:11.210043+00:00"
    };


    it("should return a lesson with properly formatted cheat sheet type 1a", async () => {
        const mockEq3 = jest.fn().mockResolvedValue({ data: [mockLesson1a], error: null });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result1a = await lessonService.getLesson("SEC0001", "UNIT0001", "1a");
        expect(mockEq1).toHaveBeenCalledWith("sectionID", "SEC0001");
        expect(mockEq2).toHaveBeenCalledWith("unitID", "UNIT0001");
        expect(mockEq3).toHaveBeenCalledWith("lessonID", "1a");
        expect(supabase.from).toHaveBeenCalledWith("lesson");
        expect(result1a).toEqual(expectedLesson1a);
    });

    it("should return a lesson with properly formatted cheat sheet type 1b", async () => {
        const mockEq3 = jest.fn().mockResolvedValue({ data: [mockLesson1b], error: null });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result1b = await lessonService.getLesson("SEC0001", "UNIT0001", "1b");
        expect(mockEq1).toHaveBeenCalledWith("sectionID", "SEC0001");
        expect(mockEq2).toHaveBeenCalledWith("unitID", "UNIT0001");
        expect(mockEq3).toHaveBeenCalledWith("lessonID", "1b");
        expect(supabase.from).toHaveBeenCalledWith("lesson");
        expect(result1b).toEqual(expectedLesson1b);
    });

    it("should return a lesson with properly formatted cheat sheet type 1c", async () => {
        const mockEq3 = jest.fn().mockResolvedValue({ data: [mockLesson1c], error: null });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result1c = await lessonService.getLesson("SEC0001", "UNIT0001", "1c");
        expect(mockEq1).toHaveBeenCalledWith("sectionID", "SEC0001");
        expect(mockEq2).toHaveBeenCalledWith("unitID", "UNIT0001");
        expect(mockEq3).toHaveBeenCalledWith("lessonID", "1c");
        expect(supabase.from).toHaveBeenCalledWith("lesson");
        expect(result1c).toEqual(expectedLesson1c);
    });

    it("should handle errors properly in getLesson", async () => {
        const mockError = new Error("Database error");
        const mockEq3 = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockEq2 = jest.fn().mockReturnValue({ eq: mockEq3 });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(lessonService.getLesson("SEC0001", "UNIT0001", "1a")).rejects.toThrow(mockError);
        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

        await expect(lessonService.getLesson("SEC0001", "UNIT0001", "1b")).rejects.toThrow(mockError);
        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

        await expect(lessonService.getLesson("SEC0001", "UNIT0001", "1c")).rejects.toThrow(mockError);
        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    });
});


describe("getAllLessons", () => {
    const sectionID = "SEC0001";
    const unitID = "UNIT0001";

    const mockLessons =
        [
            {
                "sectionID": "SEC0001",
                "unitID": "UNIT0001",
                "lessonID": "1a",
                "lessonName": "Lesson 1a: Understanding Verbal and Non-verbal Signals",
                "lessonURL": "https://youtu.be/4_5dayHDdBk?si=Jzg2RUbZ1S56eRXl&t=6",
                "lessonDuration": 3.44,
                "lessonText": null,
                "lessonDescription": "🎤👀 Communication isn't just about what we say; it's also about how we say it!\r\n✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. \r\nLearn to decipher these hidden messages and become a communication wizard! 🧙‍♂️",
                "lessonKeyTakeaway": "Verbal and non-verbal signals play crucial roles in communication, often conveying messages beyond words alone.\r\nVerbal signals encompass spoken language, including tone, pitch, and volume, which can convey emotions and intentions.\r\nNon-verbal signals, on the other hand, involve body language, facial expressions, gestures, and eye contact, providing additional context to verbal communication.\r\nUnderstanding both types of signals enhances communication effectiveness by allowing individuals to interpret and respond appropriately to the complete message being conveyed.",
                "lessonCheatSheet": "🗣️ Verbal Signals:\r\n🎶 Tone of Voice: Emotions can be conveyed through variations in pitch, volume, and intonation.\r\n📚 Word Choice: Different words can evoke different reactions and meanings.\r\n🏃‍♂️ Pace: The speed at which someone speaks can indicate excitement, nervousness, or boredom.\r\n👁️ Non-verbal Signals:\r\n🕺 Body Language: Posture, gestures, and facial expressions can speak volumes without saying a word.\r\n👀 Eye Contact: The level of eye contact can convey confidence, interest, or discomfort.\r\n🌍 Personal Space: Respect for personal space varies across cultures and can affect communication dynamics.",
                "dateCreated": "2024-08-18T14:59:11.210043+00:00"
            },
            {
                "sectionID": "SEC0001",
                "unitID": "UNIT0001",
                "lessonID": "1b",
                "lessonName": "Lesson 1b: Recognizing and Interpreting Different Communication Styles",
                "lessonURL": "https://youtu.be/li4mCDH0eUE?si=iVS59MoIeK4SdDDs&t=17",
                "lessonDuration": 4.45,
                "lessonText": null,
                "lessonDescription": "🕵️‍♀️ Ever wonder why some people just \"get\" each other while others seem to be speaking different languages?\r\n🎭 Explore the quirky world of communication styles - from the analytical thinkers to the expressive artists, and everything in between!\r\nUnravel the mysteries of these diverse styles and learn how to adapt your communication to connect with anyone, anywhere! 🔍",
                "lessonKeyTakeaway": "Communication styles vary widely among individuals and cultures, influencing how messages are conveyed and received. Four primary communication styles include analytical, expressive, amiable, and driver.\r\nAnalytical communicators prioritize facts and logic, while expressive communicators focus on emotions and relationships.\r\nAmiable communicators prioritize harmony and cooperation, while driver communicators emphasize results and efficiency.\r\nRecognizing these styles enables individuals to adapt their communication approach to suit the preferences and needs of different audiences, fostering clearer understanding and stronger connections.",
                "lessonCheatSheet": "Analytical Style:\r\n📊 Focuses on facts, logic, and precision.\r\n📋 Prefers organized and structured communication.\r\nExpressive Style:\r\n🎭 Emphasizes emotions, creativity, and storytelling. \r\n🎤 Enjoys engaging with others and sharing personal experiences. \r\nAmiable Style:\r\n🤝 Prioritizes harmony, cooperation, and relationship-building.\r\n❤️ Values empathy and understanding in communication.\r\nDriver Style:\r\n🎯 Direct, assertive, and goal-oriented.\r\n⏱️ Prefers efficiency and results-driven communication.",
                "dateCreated": "2024-08-18T14:59:11.210043+00:00"
            },
            {
                "sectionID": "SEC0001",
                "unitID": "UNIT0001",
                "lessonID": "1c",
                "lessonName": "Lesson 1c: Evaluating Behavioral Insights Concepts in Communication",
                "lessonURL": "https://www.youtube.com/watch?v=CG8m8hoq-hc",
                "lessonDuration": 5.08,
                "lessonText": null,
                "lessonDescription": "🚀 Prepare for an epic journey into the depths of human behavior!\r\n💡 Discover the secrets behind why we do what we do, from the power of social proof to the magic of reciprocity. Armed with these insights, you'll be equipped to craft messages that captivate hearts, sway minds, and spark action!\r\nIt's time to unleash your inner communicator extraordinaire! 🧠💥",
                "lessonKeyTakeaway": "Behavioral insights concepts offer valuable insights into human behavior and decision-making processes, enhancing communication effectiveness.\r\nConcepts such as social proof, reciprocity, and anchoring influence how individuals perceive and respond to messages.\r\nUnderstanding these concepts enables communicators to craft more persuasive and influential messages, whether in marketing, negotiation, or everyday interactions.\r\nBy incorporating behavioral insights into communication strategies, individuals can engage audiences more effectively, evoke desired responses, and ultimately achieve their communication goals with greater success.",
                "lessonCheatSheet": "👥 Social Proof: People are influenced by the actions and behaviors of others.\r\n🔄 Reciprocity: The tendency to feel obligated to return a favor after receiving one.\r\n🌱 Anchoring: The tendency to rely heavily on the first piece of information encountered when making decisions.\r\n🖼️ Framing: How information is presented can influence perception and decision-making.",
                "dateCreated": "2024-08-18T14:59:11.210043+00:00"
            }
        ]

    const expectedResult = [
        {
            "sectionID": "SEC0001",
            "unitID": "UNIT0001",
            "lessonID": "1a",
            "lessonName": "Lesson 1a: Understanding Verbal and Non-verbal Signals",
            "lessonURL": "4_5dayHDdBk",
            "lessonDuration": 3.44,
            "lessonText": null,
            "lessonDescription": [
                "🎤👀 Communication isn't just about what we say; it's also about how we say it!",
                "✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. ",
                "Learn to decipher these hidden messages and become a communication wizard! 🧙‍♂️"
            ],
            "lessonKeyTakeaway": [
                "Verbal and non-verbal signals play crucial roles in communication, often conveying messages beyond words alone.",
                "Verbal signals encompass spoken language, including tone, pitch, and volume, which can convey emotions and intentions.",
                "Non-verbal signals, on the other hand, involve body language, facial expressions, gestures, and eye contact, providing additional context to verbal communication.",
                "Understanding both types of signals enhances communication effectiveness by allowing individuals to interpret and respond appropriately to the complete message being conveyed."
            ],
            "lessonCheatSheet": {
                "🗣️ Verbal Signals:": [
                    "🎶 Tone of Voice: Emotions can be conveyed through variations in pitch, volume, and intonation.",
                    "📚 Word Choice: Different words can evoke different reactions and meanings.",
                    "🏃‍♂️ Pace: The speed at which someone speaks can indicate excitement, nervousness, or boredom."
                ],
                "👁️ Non-verbal Signals:": [
                    "🕺 Body Language: Posture, gestures, and facial expressions can speak volumes without saying a word.",
                    "👀 Eye Contact: The level of eye contact can convey confidence, interest, or discomfort.",
                    "🌍 Personal Space: Respect for personal space varies across cultures and can affect communication dynamics."
                ]
            },
            "dateCreated": "2024-08-18T14:59:11.210043+00:00"
        },
        {
            "sectionID": "SEC0001",
            "unitID": "UNIT0001",
            "lessonID": "1b",
            "lessonName": "Lesson 1b: Recognizing and Interpreting Different Communication Styles",
            "lessonURL": "4_5dayHDdBk",
            "lessonDuration": 4.45,
            "lessonText": null,
            "lessonDescription": [
                "🎤👀 Communication isn't just about what we say; it's also about how we say it!",
                "✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. ",
                "Learn to decipher these hidden messages and become a communication wizard! 🧙‍♂️"
            ],
            "lessonKeyTakeaway": [
                "Communication styles vary widely among individuals and cultures, influencing how messages are conveyed and received. Four primary communication styles include analytical, expressive, amiable, and driver.",
                "Analytical communicators prioritize facts and logic, while expressive communicators focus on emotions and relationships.",
                "Amiable communicators prioritize harmony and cooperation, while driver communicators emphasize results and efficiency.",
                "Recognizing these styles enables individuals to adapt their communication approach to suit the preferences and needs of different audiences, fostering clearer understanding and stronger connections."
            ],
            "lessonCheatSheet": {
                "Analytical Style": [
                    "📊 Focuses on facts, logic, and precision.",
                    "📋 Prefers organized and structured communication."
                ],
                "Expressive Style": [
                    "🎭 Emphasizes emotions, creativity, and storytelling.",
                    "🎤 Enjoys engaging with others and sharing personal experiences."
                ],
                "Amiable Style": [
                    "🤝 Prioritizes harmony, cooperation, and relationship-building.",
                    "❤️ Values empathy and understanding in communication."
                ],
                "Driver Style": [
                    "🎯 Direct, assertive, and goal-oriented.",
                    "⏱️ Prefers efficiency and results-driven communication."
                ]
            },
            "dateCreated": "2024-08-18T14:59:11.210043+00:00"
        },
        {
            "sectionID": "SEC0001",
            "unitID": "UNIT0001",
            "lessonID": "1c",
            "lessonName": "Lesson 1c: Evaluating Behavioral Insights Concepts in Communication",
            "lessonURL": "4_5dayHDdBk",
            "lessonDuration": 5.08,
            "lessonText": null,
            "lessonDescription": [
                "🎤👀 Communication isn't just about what we say; it's also about how we say it!",
                "✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. ",
                "Learn to decipher these hidden messages and become a communication wizard! 🧙‍♂️"
            ],
            "lessonKeyTakeaway": [
                "Behavioral insights concepts offer valuable insights into human behavior and decision-making processes, enhancing communication effectiveness.",
                "Concepts such as social proof, reciprocity, and anchoring influence how individuals perceive and respond to messages.",
                "Understanding these concepts enables communicators to craft more persuasive and influential messages, whether in marketing, negotiation, or everyday interactions.",
                "By incorporating behavioral insights into communication strategies, individuals can engage audiences more effectively, evoke desired responses, and ultimately achieve their communication goals with greater success."
            ],
            "lessonCheatSheet": [
                "👥 Social Proof: People are influenced by the actions and behaviors of others.",
                "🔄 Reciprocity: The tendency to feel obligated to return a favor after receiving one.",
                "🌱 Anchoring: The tendency to rely heavily on the first piece of information encountered when making decisions.",
                "🖼️ Framing: How information is presented can influence perception and decision-making."
            ],
            "dateCreated": "2024-08-18T14:59:11.210043+00:00"
        }
    ]

    it("should return all lessons for the given section and unit", async () => {
        const mockEq2 = jest.fn().mockResolvedValue({ data: mockLessons, error: null });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await lessonService.getAllLessons(sectionID, unitID);

        expect(mockEq1).toHaveBeenCalledWith("sectionID", sectionID);
        expect(mockEq2).toHaveBeenCalledWith("unitID", unitID);
        expect(supabase.from).toHaveBeenCalledWith("lesson");

        expect(result).toEqual(expectedResult);
    });

    it("should handle errors correctly and log the error", async () => {
        const mockError = new Error("Database error");
        const mockEq2 = jest.fn().mockResolvedValue({ data: null, error: mockError });
        const mockEq1 = jest.fn().mockReturnValue({ eq: mockEq2 });
        const mockSelect = jest.fn().mockReturnValue({ eq: mockEq1 });
        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(lessonService.getAllLessons(sectionID, unitID)).rejects.toThrow(mockError);
        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    });
});