import React from 'react';
import { useTypedStoreState } from '../../store/hooks';
import './styles.scss';

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
									<div className="font-mono w-[.7rem] text-xs pt-[.3rem] opacity-50">{smartLine.number}</div>
									<div className='w-fit'>
										<div className='lang-fr'>{smartLine.plainTexts.fr}</div>
										<div className='lang-sp'>{smartLine.plainTexts.sp}</div>
										<div className='lang-it'>{smartLine.plainTexts.it}</div>
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