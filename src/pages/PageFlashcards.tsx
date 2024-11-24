import { FlashcardTraining } from "../components/FlashcardTraining";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";

export const PageFlashcards = () => {
	const {
		filteredFlashcards,
		flashcardsSearchText,
		flashcardNumberShowingMessage,
	} = useTypedStoreState((state) => state.flashcardModel);
	const { toggleFlashcard, handleFlashcardSearchTextChange } =
		useTypedStoreActions((actions) => actions.flashcardModel);

	return (
		<>
			<FlashcardTraining />
			<form>
				<p className="text-sm">Search all flashcards:</p>
				<input
					type="text"
					value={flashcardsSearchText}
					placeholder="Spanish or English"
					onChange={(e) =>
						handleFlashcardSearchTextChange(e.target.value)
					}
					className="w-[20rem] mb-3 text-2xl"
				/>
			</form>
			<p
				className="mb-3"
				dangerouslySetInnerHTML={{
					__html: flashcardNumberShowingMessage,
				}}
			></p>
			{filteredFlashcards.map((filteredFlashcard) => {
				return (
					<div
						key={filteredFlashcard.idCode}
						className="mb-3 w-fit font-mono"
					>
						<p
							onClick={() => toggleFlashcard(filteredFlashcard)}
							className="text-slate-900 bg-slate-500 pt-1 pb-1 px-3 rounded-t-md select-none cursor-pointer"
						>
							{filteredFlashcard.front}
						</p>
						{filteredFlashcard.isShowing && (
							<p className=" bg-slate-600 text-yellow-200 pt-1 pb-2 px-3 rounded-b-md ">
								{filteredFlashcard.back}
							</p>
						)}
					</div>
				);
			})}
		</>
	);
};
