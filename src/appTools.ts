import { RawChapterSummary } from "./types"

export const convertLineBlockToRawChapterSummary = (lines:string[]): RawChapterSummary => {
	return {
		chapterNumber: Number(lines[0]),
		fr: lines[2],
		sp: lines[4],
		it: lines[6],
	}
}