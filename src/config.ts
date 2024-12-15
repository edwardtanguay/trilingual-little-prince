import { DisplayMode } from "./types";

export const devMode = (): boolean => {
	return true;
};

export const pointsForWrongAnswer = (): number => {
	return 1;
};

export const pointsForRightAnswer = (): number => {
	return 10;
};

export const displayMode = (): DisplayMode => {
	return "objects";
};
