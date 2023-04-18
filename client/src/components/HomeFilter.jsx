import styled from 'styled-components';

function HomeFilter() {
	return (
		<HomeFilterContainer>
			<span className="total">23,642,762 questions</span>
			<div>
				<button className="sort-button newest" type="button">
					Newest
				</button>
				<button className="sort-button active" type="button">
					Active
				</button>
				<button className="sort-button recommend" type="button">
					Recommend
				</button>
				<button className="sort-button unanswered" type="button">
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
	background-color: white;
	margin-bottom: 10px;
	padding: 0 1%;
	.total {
		font-size: var(--font-large);
	}
	.sort-button {
		background-color: white;
		font-size: var(--font-base);
		border: solid 1px black;
		height: 2em;
		cursor: pointer;
		&:hover {
			background-color: var(--line-color);
		}
	}
	.newest {
		border-radius: 5px 0 0 5px;
		border-right-width: 0;
	}
	.active {
		border-right-width: 0;
	}
	.recommend {
		border-right-width: 0;
	}
	.unanswered {
		border-radius: 0 5px 5px 0;
	}
`;
