import { SmartLine } from "../types";

interface IProps {
	smartLine: SmartLine;
}

export const DisplaySentence = ({ smartLine }: IProps) => {
	return (
		<>
			<p>{smartLine.plainTexts.fr}</p>
		</>
	);
};
