import {
	blankSentenceItemObject,
	RawChapterSummary,
	SentenceItemObject,
} from "./types";
import * as qstr from "./qtools/qstr";

export const convertLineBlockToRawChapterSummary = (
	lines: string[]
): RawChapterSummary => {
	return {
		chapterNumber: Number(lines[0]),
		fr: lines[2],
		sp: lines[4],
		it: lines[6],
	};
};

export const parseTextIntoSentenceItemObjects = (
	line: string
): SentenceItemObject[] => {
	const regex = /\[[^\]]+\]|[^\s]+/g;
	const matches = line.matchAll(regex);
	const sios: SentenceItemObject[] = [];
	for (const match of matches) {
		const sio: SentenceItemObject = structuredClone(
			blankSentenceItemObject
		);
		const rawText = match[0];
		sio.rawText = rawText;
		if (rawText.startsWith("[") && rawText.endsWith("]")) {
			parseAsDynamic(sio);
		} else {
			sio.text = sio.rawText;
		}
		sios.push(sio);
	}
	return sios;
};

// sio.rawText = "[leggera;pr=lay-JER-ah]"
export const parseAsDynamic = (sio: SentenceItemObject): void => {
	const noBrackets = qstr.chopEnds(sio.rawText, "[", "]");
	const parts = qstr.breakIntoParts(noBrackets, ';');
	const text = parts[0];
	const rawNote = parts[1];
	sio.text = text;
	sio.rawNote = rawNote;
};
