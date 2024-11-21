import _rawFlashcards from "../data/flashcards.json"; 
import { Flashcard, RawFlashcard } from "../types";

const rawFlashcards: RawFlashcard[] = _rawFlashcards;

export const getFlashcards = (): Flashcard[] => {
	const flashcards: Flashcard[] = [];
	for (const rawFlashcard of rawFlashcards) {
		const flashcard: Flashcard = {
			idCode: 'nnn',
			front: rawFlashcard.front,
			back: rawFlashcard.back,
			bulkSearch: 'nnn',
			isShowing: false
		}	
		flashcards.push(flashcard);
	}
	return flashcards;
};
