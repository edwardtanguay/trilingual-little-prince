import { Nav } from "./Nav";

export const Header = () => {
	return (
		<>
			<h1 className="text-[1.8rem] text-slate-800">Trilingual Little Prince</h1>
			<h2 className="mb-3 text-sm italic">made with React, TypeScript, Tailwind, Easy-Peasy Redux, see <a href="https://github.com/edwardtanguay/trilingual-little-prince" className="underline">repo</a>, <a href="https://trilingual-little-prince.vercel.app" className="underline">site</a> or more of my <a className="underline" href="https://tanguay-eu.vercel.app/howtos">projects</a></h2>
			<Nav />
		</>
	);
};
