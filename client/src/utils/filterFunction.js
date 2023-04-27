export const filterByTerm = (arr, term) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	return newArr.filter((el) =>
		el.title.toLowerCase().includes(term.toLowerCase()),
	);
};

export const newestList = (arr, term) => {
	const newArr = JSON.parse(JSON.stringify(filterByTerm(arr, term)));
	newArr.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
	return newArr;
};

export const activeList = (arr, term) => {
	const newArr = JSON.parse(JSON.stringify(filterByTerm(arr, term)));
	const callback = (a, b) => {
		let latestA = Math.max(new Date(a.createdAt), new Date(a.modifiedAt));
		let latestB = Math.max(new Date(b.createdAt), new Date(b.modifiedAt));
		if (a.answers.length) {
			a.answers.forEach((el) => {
				latestA = Math.max(latestA, new Date(el.createdAt));
				return el;
			});
		}
		if (b.answers.length) {
			b.answers.forEach((el) => {
				latestB = Math.max(latestB, new Date(el.createdAt));
				return el;
			});
		}
		return latestB - latestA;
	};
	return newArr.sort(callback);
};

export const recommendList = (arr, term) => {
	const newArr = JSON.parse(JSON.stringify(filterByTerm(arr, term)));
	return newArr.sort((a, b) => b.questionVoteCount - a.questionVoteCount);
};

export const unansweredList = (arr, term) => {
	const newArr = JSON.parse(JSON.stringify(filterByTerm(arr, term)));
	return newArr.filter((el) => !el.answerCount);
};

export const newestAnswer = (arr) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	newArr.sort((a, b) => {
		return (
			new Date(b.answerCreatedAt).getTime() -
			new Date(a.answerCreatedAt).getTime()
		);
	});
	return newArr;
};

export const oldestAnswer = (arr) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	newArr.sort((a, b) => {
		return (
			new Date(a.answerCreatedAt).getTime() -
			new Date(b.answerCreatedAt).getTime()
		);
	});
	return newArr;
};
