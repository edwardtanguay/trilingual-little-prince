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
						return (
							<>
								<span key={index}>nnn</span>{" "}
							</>
						);
					})}
				</>
			)}
		</div>
	);
};
