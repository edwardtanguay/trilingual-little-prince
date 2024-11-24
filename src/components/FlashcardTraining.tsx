import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const FlashcardTraining = () => {
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	const currentFlashcard = flashcards[1];
	return (
		<div className="bg-slate-300 mb-6 p-3 w-full rounded">
			<div className="flex justify-between">
				<p className="mb-3">{currentFlashcard.front}</p>
				<div className="text-xs flex gap-3 min-w-[14rem] justify-end">
					<p className="text-green-800">times got right: 0</p>
					<p className="text-red-800">times got wrong: 0</p>
				</div>
			</div>
			<div className="flex gap-3">
				<input className="rounded w-full p-1" placeholder="spanish" />
				<button className="bg-slate-400 opacity-80 text-sm py-0 px-2 rounded hover:opacity-100">
					submit
				</button>
			</div>
		</div>
	);
};
