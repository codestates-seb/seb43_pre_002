export const newestList = (arr) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	newArr.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
	return newArr;
};

// export const activeList = (arr) => {};

// export const recommendList = (arr) => {};

export const unansweredList = (arr) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	return newArr.filter((el) => !el.answer);
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
