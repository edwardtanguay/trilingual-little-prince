import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import { useParams } from "react-router-dom";
import * as qstr from "../../qtools/qstr";
import "./styles.scss";
import { ChapterNav } from "./ChapterNav";
import { DisplaySentence } from "../../components/DisplaySentence/DisplaySentence";
import * as config from "../../config";

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
							<div className="mb-2 lang-fr">
								<DisplaySentence
									smartLine={chapter.summaries}
									lang="fr"
									displayMode={config.displayMode()}
								/>
							</div>
							<div className="mb-2 lang-sp">
								{chapter.summaries.rawTexts.sp}
							</div>
							<div className="mb-2 lang-it">
								{chapter.summaries.rawTexts.it}
							</div>
						</div>
					</fieldset>
					{chapter.smartLines.map((smartLine, index) => {
						return (
							<div key={index} className="flex gap-3 mb-3">
								<div className="font-mono w-[.7rem] text-xs pt-[.3rem] opacity-50">
									{smartLine.number}
								</div>
								<div className="w-fit">
									<DisplaySentence
										smartLine={smartLine}
										lang="fr"
										displayMode={config.displayMode()}
									/>
									<DisplaySentence
										smartLine={smartLine}
										lang="sp"
										displayMode={config.displayMode()}
									/>
									<DisplaySentence
										smartLine={smartLine}
										lang="it"
										displayMode={config.displayMode()}
									/>
								</div>
							</div>
						);
					})}
				</>
			)}
		</>
	);
};
