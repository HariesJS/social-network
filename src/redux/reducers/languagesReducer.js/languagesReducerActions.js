import { SET_LANGUAGE } from "./languagesReducer";

export const setLanguageCreator = lang => ({
    type: SET_LANGUAGE,
    langs: lang
})