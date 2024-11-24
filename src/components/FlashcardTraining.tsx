/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";

// type TestingStatus = "firstTime" | "lookingAtAnswer";

export const FlashcardTraining = () => {
	const { testingFlashcard } = useTypedStoreState(
		(state) => state.flashcardModel
	);
	const { setNextTestingFlashcard } = useTypedStoreActions(
		(actions) => actions.flashcardModel
	);
	const [showingAnswer, setShowingAnswer] = useState(false);
	const [answer, setAnswer] = useState("");

	useEffect(() => {
		setNextTestingFlashcard();
	}, []);

	const handleFlipFlashcard = () => {
		setShowingAnswer(true);
	};

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAnswer(value);
	};

	return (
		<div className="bg-slate-300 mb-6 p-3 w-full rounded">
			<div className="flex justify-between">
				<p className="mb-3">{testingFlashcard.front}&nbsp;</p>
				<div className="text-xs flex gap-3 min-w-[14rem] justify-end">
					<p className="text-green-800">times got right: 0</p>
					<p className="text-red-800">times got wrong: 0</p>
				</div>
			</div>
			<div className="flex gap-3 mb-2">
				<input
					value={answer}
					className="rounded w-full p-1"
					placeholder="spanish"
					onChange={(e) => handleAnswerChange(e)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleFlipFlashcard();
						}
					}}
				/>
				<button
					className="bg-slate-400 opacity-80 text-sm py-0 px-2 rounded hover:opacity-100 whitespace-nowrap"
					onClick={() => handleFlipFlashcard()}
				>
					submit answer
				</button>
			</div>
			{showingAnswer && (
				<div>
					<p className="text-orange-950 italic">
						{testingFlashcard.back}
					</p>
				</div>
			)}
		</div>
	);
};
