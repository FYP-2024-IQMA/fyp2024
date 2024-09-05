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
            return data;
        }
    });
}
