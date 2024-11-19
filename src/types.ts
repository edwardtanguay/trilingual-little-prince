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
};

export type SmartBookChapter = {
	number: number;
	summary: string;
	smartLines: SmartLine[];
	rawLineItems: RawLineItem[]
};

export type SmartBook = {
	chapters: SmartBookChapter[];
};

export const smartBookInitialValue = {
	chapters: [],
};
