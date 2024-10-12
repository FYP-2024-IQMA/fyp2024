import supabase from "../config/supabaseConfig";

/* Utility function to extract the YouTube video ID */
function extractYouTubeID(url: string) {
    const regex =
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

const getSectionDuration = async (sectionID: string) => {
    const { data, error } = await supabase
        .from("lesson")
        .select("lessonDuration")
        .eq("sectionID", sectionID);
    
    if (error) {
        console.error(error);
        throw error;
    }
    return Math.ceil(data.reduce((acc: number, curr: any) => acc + curr.lessonDuration, 0));
};

/* READ */
export async function getAllSections() {
    const { data, error } = await supabase
        .from("section")
        .select("sectionID, sectionName");

    if (error) {
        console.error(error);
        throw error;
    }

    const transformedData = await Promise.all(
        data.map(async (section: any) => {
            const sectionDuration = await getSectionDuration(section.sectionID);
            return {
                ...section,
                sectionDuration,
            };
        })
    );

    // else {
    // 	const formattedData = data.map((section) => {
    // 		if (section.introductionURL) {
    // 			section.introductionURL = extractYouTubeID(section.introductionURL);
    // 		}
    // 		return {
    // 			...section,
    // 			finalAssessmentIntro: section.finalAssessmentIntro
    // 				? section.finalAssessmentIntro.split(/\r\n/)
    // 				: [],
    // 		};
    // 	});
    // 	return formattedData;
    // };
    return transformedData;
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
        return {
            ...data,
            finalAssessmentIntro: data.finalAssessmentIntro
                ? data.finalAssessmentIntro.split(/\r\n/)
                : [],
            finalScenario: data.finalScenario
                ? data.finalScenario.split(/\r\n/)
                : [],
            introductionURL: data.introductionURL,
        };
    }
}
