import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { useTypedStoreActions } from "./store/easy-peasy-hooks";

function App() {
	const initialize = useTypedStoreActions(
		(actions) => actions.mainModel.initialize
	);

	// const sios = appTools.parseTextIntoSentenceItemObjects(
	// 	'This doesn\'t work, [unless; es sei denn] you "speed" up.'
	// );
	// for (const sio of sios) {
	// 	console.log(11115, sio.kind, sio.prefix, '(' + sio.text + ')', sio.suffix);
	// }

	initialize();

	return (
		<div className="bg-slate-400 p-4 w-full md:w-[60rem] mt-0 md:mt-6">
			<Header />
			<main className="py-4">
				<Outlet />
			</main>
		</div>
	);
}

export default App;
