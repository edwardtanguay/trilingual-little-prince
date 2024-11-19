import React from 'react';
import { useTypedStoreState } from '../store/hooks';

export const PageWelcome = () => {
	const { smartBook } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			{smartBook.chapters.map((chapter, index) => {
				return (
					<React.Fragment>
						<h2 className='text-2xl'>CHAPTER {chapter.number}</h2>
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
					</React.Fragment>
				)
			})}
		</>
	)
}