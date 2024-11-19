import { Action, action, Thunk, thunk } from "easy-peasy";
import { LineItem } from "../../types";

export interface MainModel {
	// state
	lineItems: LineItem[];

	// actions
	loadSiteData: Action<this>;

	// thunks
	initialize: Thunk<this>;
}

export const mainModel: MainModel = {
	// state
	lineItems: [],

	// actions
	loadSiteData: action((state) => {
		state.lineItems.push({
			chapter: 1,
			lineNumber: 1,
			rawText: "nnn",
		});
		state.lineItems.push({
			chapter: 2,
			lineNumber: 1,
			rawText: "nnn",
		});
	}),

	// thunks
	initialize: thunk((actions) => {
		actions.loadSiteData
	}),
};
