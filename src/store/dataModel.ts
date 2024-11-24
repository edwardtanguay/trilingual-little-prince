import _rawFlashcards from "../data/flashcards.json";
import { Flashcard, RawFlashcard } from "../types";
import * as qstr from "../qtools/qstr";

const rawFlashcards: RawFlashcard[] = _rawFlashcards;

const deleteDuplicates = (flashcards: Flashcard[]): Flashcard[] => {
	const seen = new Set<string>();
	return flashcards.filter((card) => {
		if (seen.has(card.idCode)) {
			return false; // Duplicate found, exclude it
		}
		seen.add(card.idCode);
		return true; // Include the unique card
	});
};

const randomizeArray = (flashcards: Flashcard[]): Flashcard[] => {
	return [...flashcards].sort(() => Math.random() - 0.5);
};

export const getFlashcards = (): Flashcard[] => {
	let flashcards: Flashcard[] = [];
	for (const rawFlashcard of rawFlashcards) {
		const flashcard: Flashcard = {
			idCode: qstr.forceCamelNotation(
				rawFlashcard.front + qstr.forcePascalNotation(rawFlashcard.back)
			),
			front: rawFlashcard.front,
			back: rawFlashcard.back,
			bulkSearch:
				" " + rawFlashcard.front + " | " + rawFlashcard.back + " ",
			isShowing: false,
		};

		// TODO: we are ignoring flashcards with notes at the moment, program this back in
		if (!flashcard.back.includes(";") && !flashcard.back.includes("[")) {
			flashcards.push(flashcard);
		}
	}
	flashcards = deleteDuplicates(flashcards);
	flashcards = randomizeArray(flashcards);
	return flashcards;
};
