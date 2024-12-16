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
	const regex = /[.,;:"'()]*\[[^\]]+\][.,;:"')]?|\S+/g;
	const matches = line.matchAll(regex);
	const sios: SentenceItemObject[] = [];
	for (const match of matches) {
		const sio: SentenceItemObject = structuredClone(
			blankSentenceItemObject
		);
		const rawText = match[0];
		sio.rawText = rawText;
		parseAsSimple(sio);
		if (sio.text.startsWith("[") && sio.text.endsWith("]")) {
			parseAsDynamic(sio);
		}
		sios.push(sio);
	}
	return sios;
};

// sio.rawText = "[leggera;pr=lay-JER-ah]"
const parseAsDynamic = (sio: SentenceItemObject): void => {
	const noBrackets = qstr.chopEnds(sio.text, "[", "]");
	const parts = qstr.breakIntoParts(noBrackets, ";");
	const text = parts[0];
	const rawNote = parts[1];
	sio.text = text;
	sio.rawNote = rawNote;
	sio.kind = "dynamic";
};

// sio.rawText = "notes"
// sio.rawText = "notes,"
// sio.rawText = "'notes'"
// sio.rawText = "(notes"
// sio.rawText = "notes)"
const parseAsSimple = (sio: SentenceItemObject): void => {
	sio.kind = "simple";
	sio.text = sio.rawText;
	parsePrefix(sio);
	parseSuffix(sio);
};

const parsePrefix = (sio: SentenceItemObject): void => {
	const prefixItems = ["'", '"', "("];
	for (const prefixItem of prefixItems) {
		if (sio.rawText.startsWith(prefixItem)) {
			sio.text = qstr.chopLeft(sio.text, prefixItem);
			sio.prefix = prefixItem;
			break;
		}
	}
};

const parseSuffix = (sio: SentenceItemObject): void => {
	const suffixItems = ["'", '"', ")", ".", ",", ";", "!", "?"];
	for (const suffixItem of suffixItems) {
		if (sio.rawText.endsWith(suffixItem)) {
			sio.text = qstr.chopRight(sio.text, suffixItem);
			sio.suffix = suffixItem;
			break;
		}
	}
};
