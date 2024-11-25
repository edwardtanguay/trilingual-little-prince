/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect } from "react";
import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";
import * as config from "../config";
import * as qstr from "../qtools/qstr";
import { FlashcardAttempt } from "../types";

export const FlashcardTraining = () => {
	const {
		testingFlashcard,
		answer,
		answerIsCorrect,
		testingStatus,
		user,
		testingFlashcardHistoryItem,
	} = useTypedStoreState((state) => state.flashcardModel);
	const {
		setNextTestingFlashcard,
		setAnswer,
		setAnswerIsCorrect,
		setTestingStatus,
	} = useTypedStoreActions((actions) => actions.flashcardModel);

	useEffect(() => {
		setNextTestingFlashcard();
	}, []);

	const handleMainButtonPress = () => {
		switch (testingStatus) {
			case "typingAnswer":
				if (answer === testingFlashcard.back) {
					const flashcardAttempt: FlashcardAttempt = {
						when: qstr.getCurrentTimestamp(),
						answer: answer,
						status: "right",
					};
					testingFlashcardHistoryItem.attempts.push(flashcardAttempt);
					testingFlashcardHistoryItem.timesAnsweredRight++;
					setTestingStatus("lookingAtRightAnswer");
				} else {
					const flashcardAttempt: FlashcardAttempt = {
						when: qstr.getCurrentTimestamp(),
						answer: answer,
						status: "wrong",
					};
					testingFlashcardHistoryItem.attempts.push(flashcardAttempt);
					testingFlashcardHistoryItem.timesAnsweredWrong++;
					setTestingStatus("lookingAtWrongAnswer");
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

	const currentAnswerTextColor = (): string => {
		if (answer.trim() === "") {
			return "black";
		} else {
			return answerIsCorrect ? "darkgreen" : "darkred";
		}
	};

	return (
		<>
			{testingFlashcardHistoryItem && (
				<div className="bg-slate-300 mb-6 p-3 w-full rounded">
					<div className="flex justify-between">
						<p className="mb-3">{testingFlashcard.front}&nbsp;</p>
						<div className="text-xs flex gap-3 min-w-[14rem] justify-end">
							<p className="text-green-800">
								times got right:{" "}
								{testingFlashcardHistoryItem.timesAnsweredRight}
							</p>
							<p className="text-red-800">
								times got wrong:{" "}
								{testingFlashcardHistoryItem.timesAnsweredWrong}
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
							{testingFlashcardHistoryItem.attempts.map(
								(attempt, index) => {
									return (
										<p key={index} className="flex gap-3">
											<span className="text-slate-700">
												{attempt.when}
											</span>
											<span
												className={`${
													attempt.status === "right"
														? "text-green-800 ml-1"
														: "text-red-800 ml-1"
												}`}
												key={index}
											>
												{attempt.answer}
											</span>
										</p>
									);
								}
							)}
						</div>
					)}
				</div>
			)}
			{config.devMode() && (
				<div className="bg-gray-900 text-gray-300 p-3 rounded">
					<p>user:</p>
					<pre className="text-xs text-yellow-200">
						{JSON.stringify(user, null, 2)}
					</pre>
					<p>testingFlashcardHistoryItem:</p>
					<pre className="text-xs text-orange-400">
						{JSON.stringify(testingFlashcardHistoryItem, null, 2)}
					</pre>
				</div>
			)}
		</>
	);
};
