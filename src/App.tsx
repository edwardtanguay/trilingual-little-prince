import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { useTypedStoreActions } from "./store/easy-peasy-hooks";
// import * as appTools from './appTools';
// import { DevDisplayObject } from "./components/DevDisplayObject";

function App() {
	const initialize = useTypedStoreActions(
		(actions) => actions.mainModel.initialize
	);

	// const sios = appTools.parseTextIntoSentenceItemObjects(
	// 	"Un ([tempo lontano;long time ago], whatever) quando [avevo;had] sei anni."
	// );

	initialize();

	return (
		<div className="bg-slate-400 p-4 w-full md:w-[60rem] mt-0 md:mt-6">
			<Header />
			<main className="py-4">
				{/* <DevDisplayObject obj={sios}/> */}
				<Outlet />
			</main>
		</div>
	);
}

export default App;
