export type RawLineItem = {
	chapter: number;
	lineNumber: number;
	rawText: string;
};

export type SmartLine = {
	number: number;
	rawTexts: {
		// È [esatto;pr=ez-ZAH-toh]! Ma perché
		fr: string;
		sp: string;
		it: string;
	};
	plainTexts: {
		// È esatto! Ma perché
		fr: string;
		sp: string;
		it: string;
	};
	objects: {
		fr: SentenceItemObject[];
		sp: SentenceItemObject[];
		it: SentenceItemObject[];
	};
};

export type SmartBookChapterSummaries = {
	fr: string;
	sp: string;
	it: string;
};

export type SmartBookChapter = {
	number: number;
	summaries: SmartBookChapterSummaries;
	smartLines: SmartLine[];
	rawLineItems: RawLineItem[];
};

export type SmartBook = {
	chapters: SmartBookChapter[];
};

export const smartBookInitialValue = {
	chapters: [],
};

export type RawFlashcard = {
	front: string;
	back: string;
};

export type Flashcard = {
	idCode: string;
	front: string;
	back: string;
	bulkSearch: string;
	isShowing: boolean;
};

export const emptyFlashcard: Flashcard = {
	idCode: "",
	front: "",
	back: "",
	bulkSearch: "",
	isShowing: false,
};

export type TestingStatus =
	| "typingAnswer"
	| "lookingAtWrongAnswer"
	| "lookingAtRightAnswer";

export type FlashcardAttempt = {
	when: string;
	answer: string;
	status: "right" | "wrong";
};

export type FlashcardHistoryItem = {
	attempts: FlashcardAttempt[];
	notes: string;
	timesAnsweredRight: number;
	timesAnsweredWrong: number;
	rank: number;
};

export const blankFlashcardHistoryItem: FlashcardHistoryItem = {
	attempts: [],
	notes: "",
	timesAnsweredRight: 0,
	timesAnsweredWrong: 0,
	rank: 2.5,
};

export type FlashcardHistory = {
	[key: string]: FlashcardHistoryItem;
};

export type User = {
	idCode: string;
	firstName: string;
	lastName: string;
	totalScore: number;
	flashcardHistory: FlashcardHistory;
};

export const blankUser = {
	idCode: "edwardtanguay",
	firstName: "Edward",
	lastName: "Tanguay",
	totalScore: 0,
	flashcardHistory: {},
};

export type ChapterSummary = {
	chapterNumber: number;
	fr: string;
	sp: string;
	it: string;
};

export type SentenceItemObject = {
	kind: "simple" | "dynamic";
	rawText: string;
	prefix: string;
	text: string; // "this" or "." or "Hello" etc.
	suffix: string;
	rawNote: string; // the note that can be parsed, e.g. for [house;Haus] it would be "Haus", but for [saggiamente; pr=sah-jaw-MEN-tay] it would be "pr=sah-jaw-MEN-tay" which will be further parsed
	isOpen: boolean;
};

export const blankSentenceItemObject: SentenceItemObject = {
	kind: "simple",
	rawText: "",
	prefix: "",
	text: "",
	suffix: "",
	rawNote: "",
	isOpen: false,
};

export type LanguageAbbreviation = "fr" | "sp" | "it";

export type DisplayMode = "raw" | "plain" | "objects";
