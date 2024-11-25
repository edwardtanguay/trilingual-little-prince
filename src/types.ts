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

type FlashcardAttempt = {
	when: string;
	answer: string;
};

type FlashcardHistoryItem = {
	attempts: FlashcardAttempt[];
	notes: string;
	timesAnsweredRight: number;
	timesAnsweredWrong: number;
	rank: number;
};

type FlashcardHistory = {
	[key: string]: FlashcardHistoryItem;
};

export type User = {
	firstName: string;
	lastName: string;
	totalScore: number;
	flashcardHistory: FlashcardHistory;
};

export const blankUser = {
	firstName: "Edward",
	lastName: "Tanguay",
	totalScore: 2342,
	flashcardHistory: {
		fc8273434: {
			attempts: [
				{
					when: "2024-11-25 09:52:07",
					answer: "en caso el servedor fue perdido",
				},
				{
					when: "2024-11-25 09:53:08",
					answer: "en caso el servidor era perdido",
				},
			],
			timesAnsweredRight: 4,
			timesAnsweredWrong: 12,
			notes: "base verb: proveer, to provide, irregular",
			rank: 4.1,
		},
	},
};
