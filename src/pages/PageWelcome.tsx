import notes from '../data/notes.triling.txt?raw';
import * as qstr from '../qtools/qstr';

const lines = qstr.convertStringBlockToLines(notes)

export const PageWelcome = () => {
	return (
		<>
			<ul className='list-disc ml-6'>
				{lines.map((line, index) => {
					return (
						<li key={index}>{line}</li>
					)
				})}
			</ul>
		</>
	)
}