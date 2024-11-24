/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";

export const FlashcardTraining = () => {
	const {
		testingFlashcard,
		answer,
		answerIsCorrect,
		testingStatus,
		numberRight,
	} = useTypedStoreState((state) => state.flashcardModel);
	const {
		setNextTestingFlashcard,
		setAnswer,
		setAnswerIsCorrect,
		setTestingStatus,
		setNumberRight,
	} = useTypedStoreActions((actions) => actions.flashcardModel);

	// TODO: replace with user object based on flashcard idCode
	const [numberWrong, setNumberWrong] = useState(0);

	useEffect(() => {
		setNextTestingFlashcard();
	}, []);

	const handleMainButtonPress = () => {
		switch (testingStatus) {
			case "typingAnswer":
				if (answer === testingFlashcard.back) {
					setNumberRight(numberRight + 1);
					setTestingStatus("lookingAtRightAnswer");
				} else {
					setNumberWrong(numberWrong + 1);
					setTestingStatus("lookingAtWrongAnswer");
				}
				break;
			case "lookingAtWrongAnswer":
				setTestingStatus("typingAnswer");
				setAnswer("");
				break;
		}
	};

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAnswer(value);
		setAnswerIsCorrect(value === testingFlashcard.back);
	};

	const currentAnswerBackgroundColor = (): string => {
		if (answer.trim() === "") {
			return "#eee";
		} else {
			return answerIsCorrect ? "#ecf5e9" : "#f5ebee";
		}
	};

	return (
		<div className="bg-slate-300 mb-6 p-3 w-full rounded">
			<p>{testingStatus}</p>
			<div className="flex justify-between">
				<p className="mb-3">{testingFlashcard.front}&nbsp;</p>
				<div className="text-xs flex gap-3 min-w-[14rem] justify-end">
					<p className="text-green-800">
						times got right: {numberRight}
					</p>
					<p className="text-red-800">
						times got wrong: {numberWrong}
					</p>
				</div>
			</div>
			<div className="flex gap-3 mb-2">
				<input
					value={answer}
					className="rounded w-full p-1"
					style={{ backgroundColor: currentAnswerBackgroundColor() }}
					placeholder="spanish"
					onChange={(e) => handleAnswerChange(e)}
					autoFocus={true}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleMainButtonPress();
						}
					}}
				/>
				<button
					className="bg-slate-400 opacity-80 text-sm py-0 px-2 rounded hover:opacity-100 whitespace-nowrap"
					onClick={() => handleMainButtonPress()}
				>
					{testingStatus === "typingAnswer" && (
						<span>submit answer</span>
					)}
					{testingStatus === "lookingAtWrongAnswer" && (
						<span>try again</span>
					)}
					{testingStatus === "lookingAtRightAnswer" && (
						<span>next flashcard</span>
					)}
				</button>
			</div>
			{testingStatus === "lookingAtWrongAnswer" && (
				<div>
					<p className="text-green-950 ml-1">
						{testingFlashcard.back}
					</p>
				</div>
			)}
		</div>
	);
};
