
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import * as tools from '../qtools/qstr';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const menuItems = [
	{
		idCode: 'chapters',
		title: 'Chapters'
	},
	{
		idCode: 'about',
		title: 'About'
	}
]

export const Nav = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const location = useLocation();
	const pageIdCode = tools.chopLeft(location.pathname, '/');
	const currentMenuItem = menuItems.find(m => pageIdCode.startsWith(m.idCode));

	const handleMenuToggle = () => {
		setShowMobileMenu(!showMobileMenu)
	}

	return (
		<>
			{currentMenuItem && (
				<nav>
					<div className="md:hidden bg-slate-500 text-[1.1rem] px-4 py-2 content">
						<div className="flex justify-between">
							<p><NavLink to={currentMenuItem.idCode}>{currentMenuItem.title}</NavLink></p>
							<p className="mt-1 cursor-pointer" onClick={handleMenuToggle}><GiHamburgerMenu /></p>
						</div>
						{showMobileMenu && (
							<div>
								{menuItems.map((menuItem, index) => {
									return (
										<div key={index}>
											{(menuItem.idCode !== currentMenuItem.idCode && (
												<div key={index}
													className="mt-[.2rem]"
												><NavLink to={menuItem.idCode} onClick={() => setShowMobileMenu(false)}>{menuItem.title}</NavLink></div>
											))}
										</div>
									)
								})}
							</div>
						)}
					</div>
					<div className="hidden md:block bg-slate-500 px-4 py-2 content">
						<ul className="flex gap-4">
							{menuItems.map((menuItem, index) => {
								return (
									<div key={index}>
										{(
											<li key={index}><NavLink to={menuItem.idCode}>{menuItem.title}</NavLink></li>
										)}
									</div>
								)
							})}
						</ul>
					</div>
				</nav>
			)}
		</>
	);
};
