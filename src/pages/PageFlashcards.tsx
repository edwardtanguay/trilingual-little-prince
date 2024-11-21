import { useTypedStoreActions, useTypedStoreState } from "../store/easy-peasy-hooks";

export const PageFlashcards = () => {
	const { flashcards: filteredFlashcards } = useTypedStoreState(state => state.mainModel);
	const { toggleFlashcard, handleSearchBoxChange } = useTypedStoreActions(actions => actions.mainModel);

	return (
		<>
			<form>
				<input type="text" onChange={(e) => handleSearchBoxChange(e.target.value)} className="w-[10rem] mb-3 text-2xl" />
			</form>
			{filteredFlashcards.map((filteredFlashcard) => {
				return (
					<div key={filteredFlashcard.idCode} className="mb-3 w-fit font-mono">
						<p onClick={() => toggleFlashcard(filteredFlashcard)} className="text-slate-900 bg-slate-500 pt-1 pb-1 px-3 rounded-t-md select-none cursor-pointer">{filteredFlashcard.front}</p>
						{filteredFlashcard.isShowing && (
							<p className=" bg-slate-600 text-yellow-200 pt-1 pb-2 px-3 rounded-b-md ">{filteredFlashcard.back}</p>
						)}
					</div>
				)
			})}
		</>
	)
}