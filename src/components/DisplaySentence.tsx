import { LanguageAbbreviation, SmartLine } from "../types";

interface IProps {
	smartLine: SmartLine;
	lang: LanguageAbbreviation;
}

export const DisplaySentence = ({ smartLine, lang }: IProps) => {
	return (
		<div className={`lang-${lang}`}>
			<p>{smartLine.plainTexts[lang]}</p>
		</div>
	);
};
