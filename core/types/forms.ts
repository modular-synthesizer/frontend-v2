export type SubmissionError = {
	errorMessages: string[];
	id: string;
};

export type SubmissionEvent = Promise<{
	valid: boolean;
	errors: SubmissionError[];
}>;
