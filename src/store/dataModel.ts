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

export const getFlashcards = (): Flashcard[] => {
	let flashcards: Flashcard[] = [];
	for (const rawFlashcard of rawFlashcards) {
		const flashcard: Flashcard = {
			idCode: qstr.forceCamelNotation(
				rawFlashcard.front + qstr.forcePascalNotation(rawFlashcard.back)
			),
			front: rawFlashcard.front,
			back: rawFlashcard.back,
			bulkSearch: ' ' + rawFlashcard.front + ' | ' + rawFlashcard.back + ' ', 
		};
		flashcards.push(flashcard);
	}
	flashcards = deleteDuplicates(flashcards);
	return flashcards;
};
