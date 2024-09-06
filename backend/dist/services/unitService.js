"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoOfUnitPerSection = getNoOfUnitPerSection;
exports.getAllUnitsBySection = getAllUnitsBySection;
exports.getUnitDetailsBySectionAndUnit = getUnitDetailsBySectionAndUnit;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
/* READ */
function getNoOfUnitPerSection(sectionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseConfig_1.default
            .from("unit")
            .select("*", { count: "exact" })
            .eq("sectionID", sectionID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return count;
        }
    });
}
// get All Units by Section ID
function getAllUnitsBySection(sectionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("unit")
            .select("*")
            .eq("sectionID", sectionID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            // return data;
            const transformedData = data.map(unit => (Object.assign(Object.assign({}, unit), { unitDescription: unit.unitDescription ? unit.unitDescription.split('\r\n') : [], assessmentIntro: unit.assessmentIntro ? unit.assessmentIntro.split('\r\n') : [], realityCheck: unit.realityCheck ? unit.realityCheck.split('\r\n') : [], scenario: unit.scenario ? unit.scenario.split('\r\n') : [] })));
            return transformedData;
        }
    });
}
// get Unit Details By Section and Unit
function getUnitDetailsBySectionAndUnit(sectionUnit) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sectionID, unitID } = sectionUnit;
        const { data, error } = yield supabaseConfig_1.default
            .from("unit")
            .select("*")
            .eq("sectionID", sectionID)
            .eq("unitID", unitID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            // const unitDescriptionArray = data.unitDescription ? data.unitDescription.split('\r\n') : [];
            // const assessmentIntroArray = data.assessmentIntro ? data.assessmentIntro.split('\r\n') : [];
            // const realityCheckArray = data.realityCheck ? data.realityCheck.split('\r\n') : [];
            // const scenarioArray = data.scenario ? data.scenario.split('\r\n') : [];
            return Object.assign(Object.assign({}, data), { unitDescription: data.unitDescription ? data.unitDescription.split('\r\n') : [], assessmentIntro: data.assessmentIntro ? data.assessmentIntro.split('\r\n') : [], realityCheck: data.realityCheck ? data.realityCheck.split('\r\n') : [], scenario: data.scenario ? data.scenario.split('\r\n') : [] });
        }
    });
}
