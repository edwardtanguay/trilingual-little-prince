import React from 'react';
import { useTypedStoreState } from '../store/hooks';

export const PageWelcome = () => {
	const { smartBook } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			{smartBook.chapters.map((chapter, index) => {
				return (
					<React.Fragment key={index}>
						<h2 className='text-2xl mb-3'>CHAPTER {chapter.number}</h2>
						{chapter.smartLines.map((smartLine, index) => {
							return (
								<div key={index} className='flex gap-3 mb-3'>
									<div>{smartLine.number}</div>
									<div>
										<div>{smartLine.rawTexts.fr}</div>
										<div>{smartLine.rawTexts.sp}</div>
										<div>{smartLine.rawTexts.it}</div>
									</div>
								</div>
							)
						})}
					</React.Fragment>
				)
			})}
		</>
	)
}