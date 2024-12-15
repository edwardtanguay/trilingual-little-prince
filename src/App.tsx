import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { useTypedStoreActions } from "./store/easy-peasy-hooks";
import * as qstr from "./qtools/qstr";

function App() {
	const initialize = useTypedStoreActions(
		(actions) => actions.mainModel.initialize
	);

	initialize();

	const parts = qstr.parseTextIntoSentenceItemObjects(
		"This is a [test;here is the note] of the function."
	);

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
