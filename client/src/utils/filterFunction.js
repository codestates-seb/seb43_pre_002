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

export const filterByTerm = (arr, term) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	return newArr.filter((el) =>
		el.title.toLowerCase().includes(term.toLowerCase()),
	);
};
