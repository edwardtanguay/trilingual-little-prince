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
	buildSmartBook: Action<this>;

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
	buildSmartBook: action((state) => {
		state.smartBook.chapters = [
			{
				number: 1,
				summary: "This is chapter 001.",
				lines: [],
			},
			{
				number: 2,
				summary: "This is chapter 002.",
				lines: [],
			},
		];
	}),

	// thunks
	initialize: thunk((actions) => {
		console.log(11111, "in init");
		actions.buildRawLineItems();
	}),
};
