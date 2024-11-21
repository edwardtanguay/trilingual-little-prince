import { Flashcard } from "../types"

export const useFlashcard = (flashcard: Flashcard) => {
	return (
		<div key={flashcard.idCode} className="mb-3">
			<p>{flashcard.idCode}</p>
			<p>{flashcard.front}</p>
			<p>{flashcard.back}</p>
			<p>[{flashcard.bulkSearch}]</p>
		</div>
	)
}