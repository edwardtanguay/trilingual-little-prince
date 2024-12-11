import { NavLink } from "react-router-dom";
import { useTypedStoreState } from "../../store/easy-peasy-hooks";

export const ChapterNav = () => {
	const { smartBook } = useTypedStoreState((state) => state.mainModel);

	return (
		<nav className="flex gap-3">
			{smartBook.chapters.map((chapter) => {
				return <NavLink to="/text/2" key={chapter.number}>Chapter&nbsp;{chapter.number}</NavLink>;
			})}
		</nav>
	);
};
