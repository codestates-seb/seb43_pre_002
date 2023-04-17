import styled from 'styled-components';

function HomeFilter() {
	return (
		<HomeFilterContainer>
			<span>23,642,762 questions</span>
			<div>
				<button className="sort-button" type="button">
					Newest
				</button>
				<button className="sort-button" type="button">
					Active
				</button>
				<button className="sort-button" type="button">
					Recommend
				</button>
				<button className="sort-button" type="button">
					Unanswered
				</button>
			</div>
		</HomeFilterContainer>
	);
}

export default HomeFilter;

const HomeFilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 50px;
	background-color: pink;
	margin-bottom: 10px;
	.sort-button {
		background-color: white;
		border: solid 1px black;
		height: 2em;
	}
`;
