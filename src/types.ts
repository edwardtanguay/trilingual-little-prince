export type RawLineItem = {
	chapter: number;
	lineNumber: number;
	rawText: string;
};

export type SmartLine = {
	number: number;
	rawTexts: {
		fr: string;
		sp: string;
		it: string;
	};
	plainTexts: {
		fr: string;
		sp: string;
		it: string;
	};
};

export type SmartBookChapter = {
	number: number;
	summary: string;
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
