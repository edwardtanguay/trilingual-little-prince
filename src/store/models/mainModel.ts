import { Action, action, Thunk, thunk } from "easy-peasy";
import { RawLineItem, SmartBook, smartBookInitialValue } from "../../types";
import notes from "../../data/notes.triling.txt?raw";
import * as qstr from "../../qtools/qstr";

export interface MainModel {
	// state
	rawLineItems: RawLineItem[];
	smartBook: SmartBook;

	// actions
	buildRawLineItems: Action<this>;
	fillSmartBookWithChapterRawLines: Action<this>;

	// thunks
	initialize: Thunk<this>;
}

export const mainModel: MainModel = {
	// state
	rawLineItems: [],
	smartBook: smartBookInitialValue,

	// actions
	buildRawLineItems: action((state) => {
		const lines = qstr.convertStringBlockToLines(notes);

		let currentChapterNumber = 0;
		let currentLine = 0;
		let count = 1;
		for (const line of lines) {
			if (line.startsWith("Chapter ")) {
				const parts = qstr.breakIntoParts(line, " ");
				currentChapterNumber = Number(parts[1]);
				currentLine = 1;
			} else {
				if (line.trim() !== "") {
					state.rawLineItems.push({
						chapter: currentChapterNumber,
						lineNumber: currentLine,
						rawText: line,
					});
					count++;
					if (count % 3 === 1) {
						currentLine++;
					}
				}
			}
		}
	}),
	fillSmartBookWithChapterRawLines: action((state) => {
		let currentChapterNumber = 0;
		let rawLineItems = [];
		for (const rawLineItem of state.rawLineItems) {
			if (rawLineItem.chapter !== currentChapterNumber) {
				// save chapter that was being saved, if necessary
				if (rawLineItem.chapter !== 1) {
					state.smartBook.chapters.push({
						number: rawLineItem.chapter,
						summary: "",
						smartLines: [],
						rawLineItems: structuredClone(rawLineItems),
					});
				}
				//start new chapter
				currentChapterNumber = rawLineItem.chapter;
				rawLineItems = [];
			}
			rawLineItems.push(rawLineItem);
		}
	}),

	// thunks
	initialize: thunk((actions) => {
		actions.buildRawLineItems();
		// actions.fillSmartBookWithChapterRawLines();
	}),
};
