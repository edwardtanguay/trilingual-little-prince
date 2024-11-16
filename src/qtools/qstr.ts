import * as qstr from "./qstr";

/**
 * Removes text from the end of a string.
 *
 * qstr.chopRight('book-001', '-001');
 *
 * 'book'
 */
export const chopRight = (main: string, textToChop: string) => {
	if (main.endsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(0, mainLen - len);
		}
	}
	return main;
};

export const chopLeft = (main: string, textToChop: string) => {
	if (main.startsWith(textToChop)) {
		const len = textToChop.length;
		const mainLen = main.length;
		if (len <= mainLen) {
			return main.substring(len, mainLen);
		}
	}
	return main;
};

export const convertStringBlockToLines = (
	stringBlock: string,
	trimLines = true
) => {
	let roughLines: string[] = [];

	if (qstr.isEmpty(stringBlock)) {
		return [];
	}
	roughLines = stringBlock.split("\n");
	if (trimLines) {
		roughLines = qstr.trimAllLinesInLinesArray(roughLines);
	} else {
		// remove at least the ending \r (since not trimming is intended for leaving TABs at the end)
		roughLines = qstr.trimAllLinesOfSlashRInLinesArray(roughLines);
	}
	roughLines = qstr.trimLinesOfEndBlanks(roughLines);
	return roughLines;
};

/**
 * Check if a string is empty.
 *
 * qstr.isEmpty('');
 *
 * true
 */
export const isEmpty = (line: string) => {
	if (line === undefined || line === null) {
		return true;
	}
	line = line.toString();
	return line.trim() === "";
};

export const trimAllLinesOfSlashRInLinesArray = (lines: string[]) => {
	const newLines: string[] = [];
	lines.forEach(function (line) {
		const newLine = qstr.chopRight(line, "\r");
		newLines.push(newLine);
	});
	return newLines;
};

export const trimAllLinesInLinesArray = (lines: string[]) => {
	const newLines: string[] = [];
	lines.forEach(function (line) {
		const newLine = line.trim();
		newLines.push(newLine);
	});
	return newLines;
};

// returns a lines array that has front and end blank strings, as one without these blanks
export const trimLinesOfEndBlanks = (lines: string[]) => {
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	lines = qstr.trimBeginningLinesOfBlanks(lines);
	lines = lines.reverse();
	return lines;
};

// if first line of lines array is blank, it will remove it
// but don't remove any blank lines from middle or end
export const trimBeginningLinesOfBlanks = (lines: string[]) => {
	const newLines: string[] = [];
	let trimmingBlanks = true;
	lines.forEach(function (line) {
		const newLine = line;
		if (trimmingBlanks && line === "") {
			// skip it since it is a preceding blank item
		} else {
			newLines.push(newLine);
			trimmingBlanks = false;
		}
	});
	return newLines;
};
