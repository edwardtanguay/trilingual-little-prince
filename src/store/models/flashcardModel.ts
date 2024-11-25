import { Action, action, computed, Computed, persist } from "easy-peasy";
import {
	blankFlashcardHistoryItem,
	blankUser,
	emptyFlashcard,
	Flashcard,
	FlashcardHistoryItem,
	// FlashcardHistoryItem,
	TestingStatus,
	User,
} from "../../types";
import * as dataModel from "../dataModel";

export interface FlashcardModel {
	// state
	flashcards: Flashcard[];
	flashcardsSearchText: string;
	testingFlashcard: Flashcard;
	answer: string;
	answerIsCorrect: boolean;
	testingStatus: TestingStatus;
	numberRight: number;
	numberWrong: number;
	wrongAnswers: string[];
	user: User;

	// computed state
	filteredFlashcards: Computed<this, Flashcard[]>;
	flashcardNumberShowingMessage: Computed<this, string>;
	userFullName: Computed<this, string>;

	// actions
	loadFlashcards: Action<this>;
	toggleFlashcard: Action<this, Flashcard>;
	handleFlashcardSearchTextChange: Action<this, string>;
	setNextTestingFlashcard: Action<this>;
	setAnswer: Action<this, string>;
	setAnswerIsCorrect: Action<this, boolean>;
	setTestingStatus: Action<this, TestingStatus>;
	setNumberRight: Action<this, number>;
	setNumberWrong: Action<this, number>;
	addWrongAnswer: Action<this, string>;
}

export const flashcardModel: FlashcardModel = persist(
	{
		// state
		flashcards: [],
		flashcardsSearchText: "",
		testingFlashcard: emptyFlashcard,
		answer: "",
		answerIsCorrect: false,
		testingStatus: "typingAnswer",
		numberRight: 0,
		numberWrong: 0,
		wrongAnswers: [],
		user: blankUser,

		// computed state
		filteredFlashcards: computed((state) => {
			if (state.flashcardsSearchText.trim() === "") {
				return state.flashcards;
			} else {
				return state.flashcards.filter((m) =>
					m.bulkSearch.includes(state.flashcardsSearchText)
				);
			}
		}),
		flashcardNumberShowingMessage: computed((state) => {
			if (state.filteredFlashcards.length === state.flashcards.length) {
				return `All <span class="font-bold">${state.flashcards.length}</span> flashcards are showing:`;
			} else {
				const verb =
					state.filteredFlashcards.length === 1 ? "is" : "are";
				return `There ${verb} <span class="font-bold">${state.filteredFlashcards.length}</span> of ${state.flashcards.length} flashcards showing:`;
			}
		}),
		userFullName: computed((state) => {
			return state.user.firstName + " " + state.user.lastName;
		}),

		// actions
		loadFlashcards: action((state) => {
			state.flashcards = dataModel.getFlashcards();
			state.filteredFlashcards = structuredClone(state.flashcards);
		}),
		toggleFlashcard: action((state, flashcard) => {
			const _flashcard = state.flashcards.find(
				(m) => m.idCode === flashcard.idCode
			);
			if (_flashcard) {
				_flashcard.isShowing = !_flashcard.isShowing;
			}
		}),
		handleFlashcardSearchTextChange: action((state, searchText) => {
			state.flashcardsSearchText = searchText;
			state.flashcards.forEach((m) => (m.isShowing = false));
		}),
		setNextTestingFlashcard: action((state) => {
			const randomIndex = Math.floor(
				Math.random() * state.flashcards.length
			);
			state.testingFlashcard = state.flashcards[randomIndex];
			state.answer = "";
			state.numberRight = 0;
			state.numberWrong = 0;
			state.testingStatus = "typingAnswer";
			state.wrongAnswers = [];
			let flashcardHistoryItem: FlashcardHistoryItem =
				state.user.flashcardHistory[state.testingFlashcard.idCode];
			if (!flashcardHistoryItem) {
				flashcardHistoryItem = structuredClone(
					blankFlashcardHistoryItem
				);
			}
			state.user.flashcardHistory[state.testingFlashcard.idCode] =
				flashcardHistoryItem;
		}),
		setAnswer: action((state, answer) => {
			state.answer = answer;
		}),
		setAnswerIsCorrect: action((state, answerIsCorrect) => {
			state.answerIsCorrect = answerIsCorrect;
		}),
		setTestingStatus: action((state, testingSTatus) => {
			state.testingStatus = testingSTatus;
		}),
		setNumberRight: action((state, numberRight) => {
			state.numberRight = numberRight;
		}),
		setNumberWrong: action((state, numberWrong) => {
			state.numberWrong = numberWrong;
		}),
		addWrongAnswer: action((state, wrongAnswer) => {
			state.wrongAnswers.push(wrongAnswer);
		}),
	},
	{
		storage: "localStorage",
		allow: ["user"],
	}
);
