// import notes from '../data/notes.triling.txt?raw';
// import * as qstr from '../qtools/qstr';
import { useTypedStoreState } from '../store/hooks';

// const lines = qstr.convertStringBlockToLines(notes)

export const PageWelcome = () => {
	const { lineItems } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			<ul className='list-disc ml-6'>
				{lineItems.map((lineItem, index) => {
					return (
						<li key={index}>{lineItem.rawText}</li>
					)
				})}
			</ul>
		</>
	)
}