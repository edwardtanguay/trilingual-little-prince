import { NavLink } from "react-router-dom";
import { useTypedStoreState } from "../../store/easy-peasy-hooks";

interface IProps {
	currentChapterNumber: number;
}

export const ChapterNav = ({ currentChapterNumber }: IProps) => {
	const { smartBook } = useTypedStoreState((state) => state.mainModel);

	return (
		<nav className="flex gap-3 bg-slate-500 px-4 py-2 -mt-3">
			{smartBook.chapters.map((chapter) => {
				return (
					<NavLink
						to={`/chapters/${chapter.number}`}
						key={chapter.number}
					>
						<button className={`btn-normal ${currentChapterNumber === chapter.number ? 'chapterSelected' : 'chapterUnselected'}`}>
							{chapter.number}
						</button>
					</NavLink>
				);
			})}
		</nav>
	);
};
