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
