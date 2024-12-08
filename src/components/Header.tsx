import { useTypedStoreState } from "../store/easy-peasy-hooks";
import { Nav } from "./Nav";
import * as qstr from '../qtools/qstr';

export const Header = () => {
	const { user, userFullName } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<>
			<div className="flex justify-between">
				<div>
					<h1 className="text-[1.8rem] text-slate-800">
						Trilingual Little Prince
					</h1>
					<h2 className="mb-3 text-sm italic">
						made with React, TypeScript, Tailwind, Easy-Peasy Redux,
						see{" "}
						<a
							target="_blank"
							href="https://github.com/edwardtanguay/trilingual-little-prince"
							className="underline"
						>
							repo
						</a>
						,{" "}
						<a
							href="https://trilingual-little-prince.vercel.app"
							target="_blank"
							className="underline"
						>
							site
						</a>{" "}
						or more of my{" "}
						<a
							className="underline"
							target="_blank"
							href="https://tanguay-eu.vercel.app/howtos"
						>
							projects
						</a>
					</h2>
				</div>
				<div className="hidden flex flex-col items-end">
					<div className="flex gap-2">
						<img
							src={`images/users/${user.idCode}.jpg`}
							className="w-[1.8rem] h-[1.8rem] rounded-full "
						/>
						<p className="text-[1.2rem] text-slate-800">
							{userFullName}
						</p>
					</div>
					<p className="font-mono text-slate-700 text-[2.2rem] -mt-2">{qstr.showScore(user.totalScore)}</p>
				</div>
			</div>
			<Nav />
		</>
	);
};
