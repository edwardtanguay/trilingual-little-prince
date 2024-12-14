import { Action, action, Thunk, thunk } from "easy-peasy";
import {
	RawChapterSummary,
	RawLineItem,
	SmartBook,
	smartBookInitialValue,
} from "../../types";
import notes from "../../data/notes.triling.txt?raw";
import * as qstr from "../../qtools/qstr";
import { StoreModel } from "../store";

export interface MainModel {
	// state
	rawLineItems: RawLineItem[];
	smartBook: SmartBook;
	rawChapterSummaries: RawChapterSummary[];

	// actions
	buildRawLineItems: Action<this>;
	fillChapterSummaries: Action<this>;
	fillSmartBookWithChapterRawLines: Action<this>;
	fillRestOfSmartBook: Action<this>;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// state
	rawLineItems: [],
	smartBook: smartBookInitialValue,
	rawChapterSummaries: [],

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
		let rawLineItems: RawLineItem[] = [];
		state.rawLineItems.push({
			// TODO: resolve why we need chapter 999 here
			chapter: 999,
			lineNumber: 0,
			rawText: "",
		});
		for (const rawLineItem of state.rawLineItems) {
			if (rawLineItem.chapter !== currentChapterNumber) {
				// save chapter that was being saved, if necessary
				if (rawLineItem.chapter !== 1) {
					let fr = "";
					let sp = "";
					let it = "";
					const rawChapterSummary = state.rawChapterSummaries.find(
						(m) => m.chapterNumber === currentChapterNumber
					);
					if (rawChapterSummary) {
						fr = rawChapterSummary.fr;
						sp = rawChapterSummary.sp;
						it = rawChapterSummary.it;
					}
					state.smartBook.chapters.push({
						number: currentChapterNumber,
						summaries: {
							fr,
							sp,
							it,
						},
						smartLines: [],
						rawLineItems: [...rawLineItems],
					});
				}
				//start new chapter
				currentChapterNumber = rawLineItem.chapter;
				rawLineItems = [];
			}
			rawLineItems.push(rawLineItem);
		}
	}),
	fillRestOfSmartBook: action((state) => {
		for (const chapter of state.smartBook.chapters) {
			const numberOfLines = chapter.rawLineItems.length / 3;
			for (let i = 1; i <= numberOfLines; i++) {
				const frRawText = chapter.rawLineItems[i * 3 - 3].rawText;
				const spRawText = chapter.rawLineItems[i * 3 - 2].rawText;
				const itRawText = chapter.rawLineItems[i * 3 - 1].rawText;
				chapter.smartLines.push({
					number: i,
					rawTexts: {
						fr: frRawText,
						sp: spRawText,
						it: itRawText,
					},
					plainTexts: {
						fr: qstr.reduceRawTextToPlainText(frRawText),
						sp: qstr.reduceRawTextToPlainText(spRawText),
						it: qstr.reduceRawTextToPlainText(itRawText),
					},
				});
			}
		}
	}),
	fillChapterSummaries: action((state) => {
		state.rawChapterSummaries.push({
			chapterNumber: 1,
			fr: "fr",
			sp: "sp",
			it: "it",
		});
		state.rawChapterSummaries.push({
			chapterNumber: 2,
			fr: "fr",
			sp: "sp",
			it: "it",
		});
	}),

	// thunks
	initialize: thunk((actions, _, { getStoreActions }) => {
		actions.buildRawLineItems();
		actions.fillChapterSummaries();
		actions.fillSmartBookWithChapterRawLines();
		actions.fillRestOfSmartBook();
		getStoreActions().flashcardModel.loadFlashcards();
	}),
};
