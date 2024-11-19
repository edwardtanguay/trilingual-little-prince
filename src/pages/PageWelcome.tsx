import { useTypedStoreState } from '../store/hooks';

export const PageWelcome = () => {
	const { smartBook } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			<ul className='list-disc ml-6'>
				{smartBook.chapters.map((chapter, index) => {
					return (
						<li key={index}>CHAPTER {chapter.number}
							<ul>
								{chapter.smartLines.map((smartLine, index) => {
									return (
										<li key={index} >{smartLine.number}
											<ul>
												<li>{smartLine.rawTexts.fr}</li>
												<li>{smartLine.rawTexts.sp}</li>
												<li>{smartLine.rawTexts.it}</li>
											</ul>
										</li>
									)
								})}
							</ul>
						</li>
					)
				})}
			</ul>
		</>
	)
}