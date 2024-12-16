import { Action, action, Thunk, thunk } from "easy-peasy";
import {
	ChapterSummary,
	RawLineItem,
	SentenceItemObject,
	SmartBook,
	smartBookInitialValue,
} from "../../types";
import notes from "../../data/notes.triling.txt?raw";
import chapterSummaryFileText from "../../data/chapterSummaries.chapsum.txt?raw";
import * as qstr from "../../qtools/qstr";
import * as appTools from "../../appTools";
import { StoreModel } from "../store";
import { convertLineBlockToChapterSummary } from "../../appTools";

export interface MainModel {
	// state
	rawLineItems: RawLineItem[];
	smartBook: SmartBook;
	chapterSummaries: ChapterSummary[];

	// actions
	buildRawLineItems: Action<this>;
	fillChapterSummaries: Action<this>;
	fillSmartBookWithChapterRawLines: Action<this>;
	fillRestOfSmartBook: Action<this>;
	toggleSentenceState: Action<this, SentenceItemObject>;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// state
	rawLineItems: [],
	smartBook: smartBookInitialValue,
	chapterSummaries: [],

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
					const chapterSummary = state.chapterSummaries.find(
						(m) => m.chapterNumber === currentChapterNumber
					);
					if (chapterSummary) {
						fr = chapterSummary.fr;
						sp = chapterSummary.sp;
						it = chapterSummary.it;
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
					objects: {
						fr: appTools.parseTextIntoSentenceItemObjects(
							frRawText
						),
						sp: appTools.parseTextIntoSentenceItemObjects(
							spRawText
						),
						it: appTools.parseTextIntoSentenceItemObjects(
							itRawText
						),
					},
				});
			}
		}
	}),
	fillChapterSummaries: action((state) => {
		const lines = qstr.convertStringBlockToLines(chapterSummaryFileText);
		const textBlocks = qstr.getTextBlocks(lines);
		for (const textBlockLines of textBlocks) {
			const chapterSummary =
				convertLineBlockToChapterSummary(textBlockLines);
			state.chapterSummaries.push(chapterSummary);
		}
	}),
	toggleSentenceState: action((state, sio) => {
		sio.isOpen = !sio.isOpen;
		state.smartBook = { ...state.smartBook };
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
