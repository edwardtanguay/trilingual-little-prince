import React from "react";
import { DisplayMode, LanguageAbbreviation, SmartLine } from "../../types";
import "./styles.scss";

interface IProps {
	smartLine: SmartLine;
	lang: LanguageAbbreviation;
	displayMode: DisplayMode;
}

export const DisplaySentence = ({ smartLine, lang, displayMode }: IProps) => {
	return (
		<div className={`lang-${lang}`}>
			{displayMode === "raw" && <p>{smartLine.rawTexts[lang]}</p>}
			{displayMode === "plain" && <p>{smartLine.plainTexts[lang]}</p>}
			{displayMode === "objects" && (
				<>
					{smartLine.objects[lang].map((sio, index) => {
						return (
							<span className="displaySentence">
								{sio.kind === "simple" && (
									<React.Fragment key={index}>
										<span>
											{sio.prefix}
											{sio.text}
											{sio.suffix}
										</span>{" "}
									</React.Fragment>
								)}
								{sio.kind === "dynamic" && (
									<span
										key={index}
										className={`${
											sio.isOpen ? "isOpen" : "isClosed"
										}`}
									>
										{sio.prefix}
										<span className="flashcardFront">
											{sio.text}
										</span>{" "}
										<span className="flashcardBack">
											{sio.rawNote}
										</span>
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
