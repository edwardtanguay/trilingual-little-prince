import { Action, action, computed, Computed } from "easy-peasy";
import { emptyFlashcard, Flashcard } from "../../types";
import * as dataModel from "../dataModel";

export interface FlashcardModel {
	// state
	flashcards: Flashcard[];
	flashcardsSearchText: string;
	testingFlashcard: Flashcard;
	answer: string;

	// computed state
	filteredFlashcards: Computed<this, Flashcard[]>;
	flashcardNumberShowingMessage: Computed<this, string>;

	// actions
	loadFlashcards: Action<this>;
	toggleFlashcard: Action<this, Flashcard>;
	handleFlashcardSearchTextChange: Action<this, string>;
	setNextTestingFlashcard: Action<this>;
	setAnswer: Action<this, string>;
}

export const flashcardModel: FlashcardModel = {
	// state
	flashcards: [],
	flashcardsSearchText: "",
	testingFlashcard: emptyFlashcard,
	answer: "",

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
			const verb = state.filteredFlashcards.length === 1 ? "is" : "are";
			return `There ${verb} <span class="font-bold">${state.filteredFlashcards.length}</span> of ${state.flashcards.length} flashcards showing:`;
		}
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
		const randomIndex = Math.floor(Math.random() * state.flashcards.length);
		console.log(11111, randomIndex);
		state.testingFlashcard = state.flashcards[randomIndex];
	}),
	setAnswer: action((state, answer) => {
		state.answer = answer;
	}),
};
