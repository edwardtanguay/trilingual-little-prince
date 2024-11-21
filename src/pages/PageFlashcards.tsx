import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const PageFlashcards = () => {
	const { flashcards } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			{flashcards.map((flashcard) => {
				return (
					<div key={flashcard.idCode} className="mb-3 w-fit font-mono">
						<p className=" bg-slate-500 pt-1 pb-1 px-3 rounded-t-md">{flashcard.front}</p>
						<p className=" bg-slate-600 text-yellow-200 pt-1 pb-2 px-3 rounded-b-md ">{flashcard.back}</p>
					</div>
				)
			})}
		</>
	)
}