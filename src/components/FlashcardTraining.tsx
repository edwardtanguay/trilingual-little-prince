/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";

type TestingStatus = "typingAnswer" | "lookingAtAnswer" | "answerIsCorrect";

export const FlashcardTraining = () => {
	const { testingFlashcard } = useTypedStoreState(
		(state) => state.flashcardModel
	);
	const { setNextTestingFlashcard } = useTypedStoreActions(
		(actions) => actions.flashcardModel
	);
	const [testingStatus, setTestingStatus] =
		useState<TestingStatus>("typingAnswer");
	const [answer, setAnswer] = useState("");
	const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
	const [numberRight, setNumberRight] = useState(0);
	const [numberWrong, setNumberWrong] = useState(0);

	useEffect(() => {
		setNextTestingFlashcard();
	}, []);

	const handleMainButtonPress = () => {
		switch (testingStatus) {
			case "typingAnswer":
				if (answer === testingFlashcard.back) {
					setNumberRight(numberRight + 1);
					setTestingStatus("answerIsCorrect");
				} else {
					setNumberWrong(numberWrong + 1);
					setTestingStatus("lookingAtAnswer");
				}
				break;
			case "lookingAtAnswer":
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
					{testingStatus === "typingAnswer" ? (
						<span>submit answer</span>
					) : (
						<span>try again</span>
					)}
				</button>
			</div>
			{testingStatus === "lookingAtAnswer" && (
				<div>
					<p className="text-green-950 ml-1">
						{testingFlashcard.back}
					</p>
				</div>
			)}
		</div>
	);
};
