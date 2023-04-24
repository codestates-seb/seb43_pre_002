export const newestList = (arr) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	newArr.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	});
	return newArr;
};
// comment는 아직 없음
// export const activeList = (arr) => {
// 	const newArr = JSON.parse(JSON.stringify(arr));
// 	const callback = (a, b) => {
// 		let latestA = Math.max(new Date(a.createdAt), new Date(a.modifiedAt));
// 		let latestB = Math.max(new Date(b.createdAt), new Date(b.modifiedAt));
// 		if (a.answer.length) {
// 			a.answer.forEach((el) => {
// 				latestA = Math.max(latestA, new Date(el.createdAt));
// 				return el;
// 			});
// 		}
// 		if (b.answer.length) {
// 			b.answer.forEach((el) => {
// 				latestB = Math.max(latestB, new Date(el.createdAt));
// 				return el;
// 			});
// 		}
// 		return latestB - latestA;
// 	};
// 	return newArr.sort(callback);
// };

export const recommendList = (arr) => {
	const newArr = JSON.parse(JSON.stringify(arr));
	return newArr.sort((a, b) => b.questionVoteCount - a.questionVoteCount);
};

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
