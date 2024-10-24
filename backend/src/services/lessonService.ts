import supabase from "../config/supabaseConfig";
import * as videoService from "./videoService";

/* READ */

// get all lessons in the specific unit
export async function getNoOfLessonPerUnit(
	sectionID: string,
	unitID: string
): Promise<number> {
	const { count, error } = await supabase
		.from("lesson")
		.select("*", { count: "exact" })
		.eq("sectionID", sectionID)
		.eq("unitID", unitID);

	if (error) {
		console.error(error);
		throw error;
	} else {
		return count!;
	}
}

// get a specific lesson
export async function getLesson(
	sectionID: string,
	unitID: string,
	lessonID: string
) {
	const { data, error } = await supabase
		.from("lesson")
		.select("*")
		.eq("sectionID", sectionID)
		.eq("unitID", unitID)
		.eq("lessonID", lessonID);

	if (error) {
		console.error(error);
		throw error;
	} else {

		let formattedLessonURL = data[0].lessonURL

		if (formattedLessonURL) {
			formattedLessonURL = await videoService.formatVideoUrl(formattedLessonURL, sectionID, unitID, lessonID);
		}

		let description = data[0].lessonDescription;
		let formattedDescription: string[] | null = description
			? description.split(/\r?\n/)
			: null;
		let takeaway = data[0].lessonKeyTakeaway;
		let formattedTakeaway: string[] | null = takeaway
			? takeaway.split(/\r?\n/)
			: null;
		const text = data[0].lessonCheatSheet;

		// when there is 2 headers in the text
		const regex = /^(?:\p{Emoji}|\p{So})[^\n]*:$/gmu;
		const headers = text ? text.match(regex) : null;

		if (headers != null) {
			const sections = text ? text.split(regex) : null;
			sections?.shift();
			const formattedCheatSheet = headers.reduce(
				(acc: Record<string, string[]>, header: string, index: number) => {
					if (sections != null) {
						acc[header.trim()] = sections[index]
							.trim()
							.split(/\r?\n/)
							.map((sentence: string) => sentence.trim());
					}
					return acc;
				},
				{}
			);

			return {
				...data[0],
				lessonURL: formattedLessonURL,
				lessonDescription: formattedDescription,
				lessonKeyTakeaway: formattedTakeaway,
				lessonCheatSheet: formattedCheatSheet,
			};
		}

		//when there is no emoji in the headers
		const regex2 = /^(?:|\p{So})[^\n]*:$/gmu;
		const headers2 = text ? text.match(regex2) : null;
		if (headers2 != null) {
			const sections = text?.split(/^(?:.*?)(?=\s*:\s*$)/gmu);
			sections?.shift();

			const formattedCheatSheet = headers2.reduce(
				(acc: Record<string, string[]>, header: string, index: number) => {
					if (sections != null) {
						acc[header.trim()] = sections[index]
							.trim()
							.split(/:?\r?\n/)
							.map((sentence: string) => sentence.trim())
							.filter((sentence: string) => sentence !== "");
					}
					return acc;
				},
				{}
			);
			return {
				...data[0],
				lessonURL: formattedLessonURL,
				lessonDescription: formattedDescription,
				lessonKeyTakeaway: formattedTakeaway,
				lessonCheatSheet: formattedCheatSheet,
			};
		}

		//when there is no headers
		const sentences = text?.split(/\r?\n/);

		if (sentences != null) {
			return {
				...data[0],
				lessonURL: formattedLessonURL,
				lessonDescription: formattedDescription,
				lessonKeyTakeaway: formattedTakeaway,
				lessonCheatSheet: sentences,
			};
		}

		return {
			...data[0],
			lessonURL: formattedLessonURL,
			lessonDescription: formattedDescription,
			lessonKeyTakeaway: formattedTakeaway,
			lessonCheatSheet: [],
		};
	}
}

export async function getAllLessons(sectionID: string, unitID: string) {
	const { data, error } = await supabase
		.from("lesson")
		.select("*")
		.eq("sectionID", sectionID)
		.eq("unitID", unitID);

	if (error) {
		console.error(error);
		throw error;
	} else {

		const formattedLessons = await Promise.all(
            data.map(async (lesson: any) => {
                let formattedLessonURL = lesson.lessonURL;

                if (formattedLessonURL) {
                    formattedLessonURL = await videoService.formatVideoUrl(
                        lesson.lessonURL,
						sectionID,
						unitID,
                        lesson.lessonID
                    );
                }

                let description = lesson.lessonDescription;
                let formattedDescription: string[] | null = description
                    ? description.split(/\r?\n/)
                    : null;
                let takeaway = lesson.lessonKeyTakeaway;
                let formattedTakeaway: string[] | null = takeaway
                    ? takeaway.split(/\r?\n/)
                    : null;
                const text = lesson.lessonCheatSheet;

                // when there are headers with emojis
                const regex = /^(?:\p{Emoji}|\p{So})[^\n]*:$/gmu;
                const headers = text ? text.match(regex) : null;

                if (headers != null) {
                    const sections = text ? text.split(regex) : null;
                    sections?.shift();
                    const formattedCheatSheet = headers.reduce(
                        (
                            acc: Record<string, string[]>,
                            header: string,
                            index: number
                        ) => {
                            if (sections != null) {
                                acc[header.trim()] = sections[index]
                                    .trim()
                                    .split(/\r?\n/)
                                    .map((sentence: string) => sentence.trim());
                            }
                            return acc;
                        },
                        {}
                    );

                    return {
                        ...lesson,
                        lessonURL: formattedLessonURL,
                        lessonDescription: formattedDescription,
                        lessonKeyTakeaway: formattedTakeaway,
                        lessonCheatSheet: formattedCheatSheet,
                    };
                }

                // when there are no emojis in the headers
                const regex2 = /^(?:|\p{So})[^\n]*:$/gmu;
                const headers2 = text ? text.match(regex2) : null;

                if (headers2 != null) {
                    const sections = text?.split(/^(?:.*?)(?=\s*:\s*$)/gmu);
                    sections?.shift();

                    const formattedCheatSheet = headers2.reduce(
                        (
                            acc: Record<string, string[]>,
                            header: string,
                            index: number
                        ) => {
                            if (sections != null) {
                                acc[header.trim()] = sections[index]
                                    .trim()
                                    .split(/:?\r?\n/)
                                    .map((sentence: string) => sentence.trim())
                                    .filter(
                                        (sentence: string) => sentence !== ""
                                    );
                            }
                            return acc;
                        },
                        {}
                    );

                    return {
                        ...lesson,
                        lessonURL: formattedLessonURL,
                        lessonDescription: formattedDescription,
                        lessonKeyTakeaway: formattedTakeaway,
                        lessonCheatSheet: formattedCheatSheet,
                    };
                }

                // when there are no headers
                const sentences = text?.split(/\r?\n/);
                if (sentences != null) {
                    return {
                        ...lesson,
                        lessonURL: formattedLessonURL,
                        lessonDescription: formattedDescription,
                        lessonKeyTakeaway: formattedTakeaway,
                        lessonCheatSheet: sentences,
                    };
                }

                return {
                    ...lesson,
                    lessonURL: formattedLessonURL,
                    lessonDescription: formattedDescription,
                    lessonKeyTakeaway: formattedTakeaway,
                    lessonCheatSheet: [],
                };
            })
        );

		return formattedLessons;
	}
}
