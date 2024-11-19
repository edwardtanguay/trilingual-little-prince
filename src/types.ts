export type RawLineItem = {
	chapter: number;
	lineNumber: number;
	rawText: string;
};

export type SmartBookChapterLine = {
	number: number;
	rawTexts: {
		fr: string;
		sp: string;
		it: string;
	}
}

export type SmartBookChapter = {
	number: number;
	summary: string;
	lines: SmartBookChapterLine[]
}

export type SmartBook = {
	chapters: SmartBookChapter[]
}
