import { FaPencilAlt } from 'react-icons/fa';

// helper 내용 및 크기(높이)
// 길이 2인 배열 형태, 첫번째 요소는 contents, 두번째 요소는 helper box 높이

// 타이틀 헬퍼
export const titleHelperContents = [
	<>
		<h5 className="title">Writing a good title</h5>
		<div className="descriptor">
			<div className="descriptor__icon">
				<FaPencilAlt size={40} />
			</div>
			<div className="descriptor__contents">
				<p>Your title should summarize the problem.</p>
				<p>
					You might find that you have a better idea of your title after writing
					out the rest of the question.
				</p>
			</div>
		</div>
	</>,
	150,
];

// 디테일 헬퍼
export const detailHelperContents = [
	<>
		<h5 className="title">Introduce the problem</h5>
		<div className="descriptor">
			<div className="descriptor__icon">
				<FaPencilAlt size={40} />
			</div>
			<div className="descriptor__contents">
				<p>
					Explain how you encountered the problem you’re trying to solve, and
					any difficulties that have prevented you from solving it yourself.
				</p>
			</div>
		</div>
	</>,
	150,
];

// tryAndExpect 헬퍼
export const tryAndExpectContents = [
	<>
		<h5 className="title">Expect on the problem</h5>
		<div className="descriptor">
			<div className="descriptor__icon">
				<FaPencilAlt size={40} />
			</div>
			<div className="descriptor__contents">
				<p>
					Show what you’ve tried, tell us what happened, and why it didn’t meet
					your needs.
				</p>
				<p>
					Not all questions benefit from including code, but if your problem is
					better understood with code you’ve written, you should include a
					minimal, reproducible example.
				</p>
				<p>
					Please make sure to post code and errors as text directly to the
					question (and not as images), and format them appropriately.
				</p>
			</div>
		</div>
	</>,
	250,
];
