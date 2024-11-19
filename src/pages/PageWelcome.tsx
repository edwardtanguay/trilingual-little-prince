import { useTypedStoreState } from '../store/hooks';

export const PageWelcome = () => {
	const { smartBook } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			<ul className='list-disc ml-6'>
				{smartBook.chapters.map((chapter, index) => {
					return (
						<li key={index}>CHAPTER {chapter.number} - {chapter.summary}</li>
					)
				})}
			</ul>
		</>
	)
}