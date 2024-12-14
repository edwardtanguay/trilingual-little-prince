import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import { useParams } from "react-router-dom";
import * as qstr from "../../qtools/qstr";
import "./styles.scss";
import { ChapterNav } from "./ChapterNav";

export const PageChapters = () => {
	const { smartBook } = useTypedStoreState((state) => state.mainModel);

	const { chapter: _currentChapterNumber } = useParams();
	let currentChapterNumber = qstr.forceToNumber(_currentChapterNumber);
	const numberOfChapters = smartBook.chapters.length;
	if (currentChapterNumber < 1 || currentChapterNumber > numberOfChapters) {
		currentChapterNumber = 1;
	}

	const chapter = smartBook.chapters.find(
		(m) => m.number === currentChapterNumber
	);

	return (
		<>
			{chapter && (
				<>
					<ChapterNav currentChapterNumber={currentChapterNumber} />
					<h2 className="text-2xl mb-3 mt-3">
						CHAPTER {chapter.number}
					</h2>
					<fieldset className="border-slate-500 border rounded px-3 pt-1 pb-2 mb-3">
						<legend className="smallcaps px-2">Summary</legend>
						<div className="italic">
						<div className="mb-2 lang-fr">{chapter.summaries.fr}</div>
						<div className="mb-2 lang-sp">{chapter.summaries.sp}</div>
						<div className="mb-2 lang-it">{chapter.summaries.it}</div>
						</div>
					</fieldset>
					{chapter.smartLines.map((smartLine, index) => {
						return (
							<div key={index} className="flex gap-3 mb-3">
								<div className="font-mono w-[.7rem] text-xs pt-[.3rem] opacity-50">
									{smartLine.number}
								</div>
								<div className="w-fit">
									<div className="lang-fr">
										{smartLine.plainTexts.fr}
									</div>
									<div className="lang-sp">
										{smartLine.plainTexts.sp}
									</div>
									<div className="lang-it">
										{smartLine.plainTexts.it}
									</div>
								</div>
							</div>
						);
					})}
				</>
			)}
		</>
	);
};
