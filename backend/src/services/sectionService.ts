import supabase from "../config/supabaseConfig";

/* Utility function to extract the YouTube video ID */
function extractYouTubeID(url: string) {
	const regex =
		/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/;
	const matches = url.match(regex);
	return matches ? matches[1] : null;
}

/* READ */
export async function getAllSections() {
	const { data, error } = await supabase.from("section").select("*");

	if (error) {
		console.error(error);
		throw error;
	} else {
		const formattedData = data.map((section) => {
			if (section.introductionURL) {
				section.introductionURL = extractYouTubeID(section.introductionURL);
			}
			return section;
		});
		return formattedData;
	}
}

export async function getSectionDetails(sectionID: string) {
	const { data, error } = await supabase
		.from("section")
		.select("*")
		.eq("sectionID", sectionID)
		.single();

	if (error) {
		console.error(error);
		throw error;
	} else {
		if (data.introductionURL) {
			data.introductionURL = extractYouTubeID(data.introductionURL);
		}
		return data;
	}
}
