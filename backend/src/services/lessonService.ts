import supabase from "../config/supabaseConfig";

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
			const result = headers.reduce(
				(acc: Record<string, string>, header, index) => {
					if (sections != null) {
						acc[header.trim()] = sections[index].trim();
					}
					return acc;
				},
				{}
			);

			return {
				...data[0],
				lessonKeyTakeaway: formattedTakeaway,
				lessonCheatSheet: result,
			};
		}

		//when there is no emoji in the headers
		const regex2 = /^(.*?)(?=\s*:\s*$)/gmu;
		const headers2 = text ? text.match(regex2) : null;
		console.log(headers2);
		if (headers2 != null) {
			const sections = text?.split(/^(?:.*?)(?=\s*:\s*$)/gmu);
			sections?.shift();

			const result = headers2.reduce(
				(acc: Record<string, string>, header, index) => {
					if (sections != null) {
						acc[header.trim()] = sections[index].trim();
					}
					return acc;
				},
				{}
			);

			return {
				...data[0],
				lessonKeyTakeaway: formattedTakeaway,
				lessonCheatSheet: result,
			};
		}

		//when there is no headers
		const sentences = text?.split(/\r?\n/);
		console.log(sentences);
		return {
			...data[0],
			lessonKeyTakeaway: formattedTakeaway,
			lessonCheatSheet: sentences,
		};

		return data;
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
		return data;
	}
}
