import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const PageFlashcards = () => {
	const { flashcards } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			{flashcards.map((flashcard, index) => {
				return (
					<div key={index} className="mb-3">
						<p>{flashcard.idCode}</p>
						<p>{flashcard.front}</p>
						<p>{flashcard.back}</p>
						<p>{flashcard.bulkSearch}</p>
						<p>{flashcard.isShowing ? 'showing' : 'no showing'}</p>
					</div>
				)
			})}
		</>
	)
}