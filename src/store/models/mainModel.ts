import { Action, action, Thunk, thunk } from "easy-peasy";
import {
	Flashcard,
	RawLineItem,
	SmartBook,
	smartBookInitialValue,
} from "../../types";
import notes from "../../data/notes.triling.txt?raw";
import * as qstr from "../../qtools/qstr";
import * as dataModel from "../dataModel";

export interface MainModel {
	// state
	rawLineItems: RawLineItem[];
	smartBook: SmartBook;
	flashcards: Flashcard[];
	filteredFlashcards: Flashcard[];
	testMessages: string[];

	// actions
	buildRawLineItems: Action<this>;
	fillSmartBookWithChapterRawLines: Action<this>;
	fillRestOfSmartBook: Action<this>;
	loadFlashcards: Action<this>;
	toggleFlashcard: Action<this, Flashcard>;
	handleSearchBoxChange: Action<this, string>;

	// thunks
	initialize: Thunk<this>;
}

export const mainModel: MainModel = {
	// state
	rawLineItems: [],
	smartBook: smartBookInitialValue,
	flashcards: [],
	filteredFlashcards: [],
	testMessages: ["original001", "original002"],

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
			chapter: 999,
			lineNumber: 0,
			rawText: "",
		});
		for (const rawLineItem of state.rawLineItems) {
			if (rawLineItem.chapter !== currentChapterNumber) {
				// save chapter that was being saved, if necessary
				if (rawLineItem.chapter !== 1) {
					state.smartBook.chapters.push({
						number: currentChapterNumber,
						summary: "",
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
	loadFlashcards: action((state) => {
		state.flashcards = dataModel.getFlashcards();
		state.filteredFlashcards = structuredClone(state.flashcards);
	}),
	toggleFlashcard: action((state, flashcard) => {
		console.log(11111, "in toggle");
		// flashcard.isShowing = !flashcard.isShowing;
		const _flashcard = state.flashcards.find(
			(m) => m.idCode === flashcard.idCode
		);
		if (_flashcard) {
			_flashcard.isShowing = !_flashcard.isShowing;
		}
	}),
	handleSearchBoxChange: action((state, searchText) => {
		// state.filteredFlashcards = structuredClone(state.filteredFlashcards.slice(0, 3));
		state.filteredFlashcards.push(state.filteredFlashcards[0]);
		console.log(11112, "search handled");
		console.log(11113, searchText);
	}),

	// thunks
	initialize: thunk((actions) => {
		actions.buildRawLineItems();
		actions.fillSmartBookWithChapterRawLines();
		actions.fillRestOfSmartBook();
		actions.loadFlashcards();
	}),
};
