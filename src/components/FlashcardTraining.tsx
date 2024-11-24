import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const FlashcardTraining = () => {
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	const currentFlashcard = flashcards[0];
	return (
		<div className="bg-gray-300 mb-6 p-3 w-fit rounded">
			<p className="mb-3">{currentFlashcard.front}</p>
			<div className="flex gap-3">
			<input className="rounded w-[30rem]" placeholder="spanish"/><button className="bg-gray-400 text-sm py-0 px-2 rounded">submit</button>
			</div>
		</div>
	);
};
