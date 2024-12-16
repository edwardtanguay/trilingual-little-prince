import React from "react";
import {
	DisplayMode,
	LanguageAbbreviation,
	SentenceItemObject,
	SmartBookChapterSummary,
	SmartLine,
} from "../../types";
import "./styles.scss";
import { useTypedStoreActions } from "../../store/easy-peasy-hooks";

interface IProps {
	smartLine: SmartLine | SmartBookChapterSummary;
	lang: LanguageAbbreviation;
	displayMode: DisplayMode;
}

export const DisplaySentence = ({ smartLine, lang, displayMode }: IProps) => {
	const { toggleSentenceState } = useTypedStoreActions(
		(actions) => actions.mainModel
	);

	const handleFlashcardToggle = (sio: SentenceItemObject) => {
		toggleSentenceState(sio);
	};

	return (
		<div className={`lang-${lang}`}>
			{displayMode === "raw" && <p>{smartLine.rawTexts[lang]}</p>}
			{displayMode === "plain" && <p>{smartLine.plainTexts[lang]}</p>}
			{displayMode === "objects" && (
				<>
					{smartLine.objects[lang].map((sio, index) => {
						return (
							<span
								className={`displaySentence ${
									sio.isOpen ? "isOpen" : "isClosed"
								}`}
								key={index}
							>
								{sio.kind === "simple" && (
									<React.Fragment>
										<span>
											{sio.prefix}
											{sio.text}
											{sio.suffix}
										</span>{" "}
									</React.Fragment>
								)}
								{sio.kind === "dynamic" && (
									<span>
										{sio.prefix}
										<span
											onClick={() =>
												handleFlashcardToggle(sio)
											}
											className="flashcardFront"
										>
											{sio.text}
										</span>
										{sio.isOpen && (
											<>
												{" "}
												<span
													onClick={() =>
														handleFlashcardToggle(
															sio
														)
													}
													className="flashcardBack"
												>
													{sio.rawNote}
												</span>
											</>
										)}
										{sio.suffix}{" "}
									</span>
								)}
							</span>
						);
					})}
				</>
			)}
		</div>
	);
};
