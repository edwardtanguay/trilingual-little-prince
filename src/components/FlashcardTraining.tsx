import { ChangeEvent, useEffect } from "react";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";
import * as config from "../config";

export const FlashcardTraining = () => {
	const {
		testingFlashcard,
		answer,
		answerIsCorrect,
		testingStatus,
		numberRight,
		numberWrong,
		wrongAnswers,
		user
	} = useTypedStoreState((state) => state.flashcardModel);
	const {
		setNextTestingFlashcard,
		setAnswer,
		setAnswerIsCorrect,
		setTestingStatus,
		setNumberRight,
		setNumberWrong,
		addWrongAnswer,
	} = useTypedStoreActions((actions) => actions.flashcardModel);

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
					addWrongAnswer(answer);
				}
				break;
			case "lookingAtWrongAnswer":
				setTestingStatus("typingAnswer");
				setAnswer("");
				break;
			case "lookingAtRightAnswer":
				setNextTestingFlashcard();
				break;
		}
	};

	const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
		user.firstName = 'nnn';
		const value = e.target.value.trim();
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

	const currentAnswerTextColor = (): string => {
		if (answer.trim() === "") {
			return "black";
		} else {
			return answerIsCorrect ? "darkgreen" : "darkred";
		}
	};

	return (
		<>
			<div className="bg-slate-300 mb-6 p-3 w-full rounded">
				[{testingFlashcard.idCode}]
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
						style={{
							backgroundColor: currentAnswerBackgroundColor(),
							color: currentAnswerTextColor(),
						}}
						placeholder="spanish"
						onChange={(e) => handleAnswerChange(e)}
						autoFocus={true}
						onKeyDown={(e) => {
							if (e.key === "Enter" && answer.trim() !== "") {
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
				{testingStatus === "lookingAtRightAnswer" && (
					<div>
						{wrongAnswers.map((wrongAnswer, index) => {
							return (
								<p className="text-red-800 ml-1" key={index}>
									{wrongAnswer}
								</p>
							);
						})}
						<p className="text-green-800 ml-1">
							{testingFlashcard.back}
						</p>
					</div>
				)}
			</div>
			{config.devMode() && (
				<div className="bg-gray-900 text-gray-300 p-3 rounded">
					<p>user:</p>
					<pre className="text-xs text-yellow-200">{JSON.stringify(user, null, 2)}</pre>
				</div>
			)}
		</>
	);
};
