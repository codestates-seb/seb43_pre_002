import styled from 'styled-components';
import {
	newestList,
	recommendList,
	unansweredList,
} from '../utils/filterFunction';

function HomeFilter({ totalDataCount, allData, setFilteredData }) {
	const handleNewest = () => {
		setFilteredData(newestList(allData));
	};
	const handleUnanswered = () => {
		setFilteredData(unansweredList(allData));
	};
	const handleRecommend = () => {
		setFilteredData(recommendList(allData));
	};

	return (
		<HomeFilterContainer>
			<span className="total">{totalDataCount} questions</span>
			<div>
				<button
					className="sort-button newest"
					type="button"
					onClick={handleNewest}
				>
					Newest
				</button>
				<button className="sort-button active" type="button">
					Active
				</button>
				<button
					className="sort-button recommend"
					type="button"
					onClick={handleRecommend}
				>
					Recommend
				</button>
				<button
					className="sort-button unanswered"
					type="button"
					onClick={handleUnanswered}
				>
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
	min-height: 30px;
	background-color: white;
	margin-bottom: 10px;
	padding: 0 10%;
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
