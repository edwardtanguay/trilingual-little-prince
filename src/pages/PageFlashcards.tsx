import { useTypedStoreActions, useTypedStoreState } from "../store/easy-peasy-hooks";

export const PageFlashcards = () => {
	const { flashcards } = useTypedStoreState(state => state.mainModel);
	const { toggleFlashcard } = useTypedStoreActions(actions => actions.mainModel);

	return (
		<>
			{flashcards.map((flashcard) => {
				return (
					<div key={flashcard.idCode} className="mb-3 w-fit font-mono">
						<p onClick={() => toggleFlashcard(flashcard)} className="text-slate-900 bg-slate-500 pt-1 pb-1 px-3 rounded-t-md select-none cursor-pointer">{flashcard.front}</p>
						{flashcard.isShowing && (
							<p className=" bg-slate-600 text-yellow-200 pt-1 pb-2 px-3 rounded-b-md ">{flashcard.back}</p>
						)}
					</div>
				)
			})}
		</>
	)
}