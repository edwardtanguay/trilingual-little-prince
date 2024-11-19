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
		for (const line of lines) {
			if (line.startsWith('Chapter ')) {
				currentChapterNumber = 999;
			}
			state.lineItems.push({
				chapter: currentChapterNumber,
				lineNumber: 1,
				rawText: line,
			});
		}
	}),

	// thunks
	initialize: thunk((actions) => {
		console.log(11111, "in init");
		actions.loadSiteData();
	}),
};
