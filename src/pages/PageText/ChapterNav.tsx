import { NavLink } from "react-router-dom";
import { useTypedStoreState } from "../../store/easy-peasy-hooks";

export const ChapterNav = () => {
	const { smartBook } = useTypedStoreState((state) => state.mainModel);

	return (
		<nav className="flex gap-3 bg-slate-500 px-4 py-2">
			{smartBook.chapters.map((chapter) => {
				return (
					<NavLink
						to={`/text/${chapter.number}`}
						key={chapter.number}
					>
						<button className="btn-normal">{chapter.number}</button>
					</NavLink>
				);
			})}
		</nav>
	);
};
