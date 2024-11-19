import { Action, action, Thunk, thunk } from "easy-peasy";
import { LineItem } from "../../types";
import notes from "../../data/notes.triling.txt?raw";
import * as qstr from "../../qtools/qstr";

export interface MainModel {
	// state
	lineItems: LineItem[];

	// actions
	loadSiteData: Action<this>;

	// thunks
	initialize: Thunk<this>;
}

export const mainModel: MainModel = {
	// state
	lineItems: [],

	// actions
	loadSiteData: action((state) => {
		const lines = qstr.convertStringBlockToLines(notes);

		let currentChapterNumber = 0;
		let currentLine = 0;
		for (const line of lines) {
			if (line.startsWith("Chapter ")) {
				currentChapterNumber = 999;
				currentLine = 1;
			} else {
				if (line.trim() !== "") {
					state.lineItems.push({
						chapter: currentChapterNumber,
						lineNumber: currentLine,
						rawText: line,
					});
					currentLine++;
				}
			}
		}
	}),

	// thunks
	initialize: thunk((actions) => {
		console.log(11111, "in init");
		actions.loadSiteData();
	}),
};
