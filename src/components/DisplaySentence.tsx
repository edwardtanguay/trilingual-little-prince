import React from "react";
import { DisplayMode, LanguageAbbreviation, SmartLine } from "../types";

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
						if (sio.kind === "simple") {
							return (
								<React.Fragment key={index}>
									<span>
										{sio.prefix}
										{sio.text}
										{sio.suffix}
									</span>{" "}
								</React.Fragment>
							);
						}
						if (sio.kind === "dynamic") {
							return (
								<span key={index}>
									{sio.prefix}
									<span className="font-bold">
										{sio.text}{" "}
									</span>
									<span className="font-mono text-xs bg-yellow-200">
										({sio.rawNote})
									</span>
									{sio.suffix}{" "}
								</span>
							);
						}
					})}
				</>
			)}
		</div>
	);
};
