import { useTypedStoreState } from '../store/hooks';

export const PageWelcome = () => {
	const { lineItems } = useTypedStoreState(state => state.mainModel);

	return (
		<>
			<ul className='list-disc ml-6'>
				{lineItems.map((lineItem, index) => {
					return (
						<li key={index}>{lineItem.chapter}/{lineItem.lineNumber}: {lineItem.rawText}</li>
					)
				})}
			</ul>
		</>
	)
}