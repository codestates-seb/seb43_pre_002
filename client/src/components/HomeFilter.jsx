import styled from 'styled-components';
import { useState } from 'react';
import {
	activeList,
	newestList,
	recommendList,
	unansweredList,
} from '../utils/filterFunction';

function HomeFilter({ totalDataCount, allData, setFilteredData }) {
	const initialActiveButton = {
		newest: false,
		active: false,
		recommend: false,
		unanswered: false,
	};
	const [isActiveButton, setIsActiveButton] = useState(initialActiveButton);
	const handleNewest = () => {
		setFilteredData(newestList(allData));
		setIsActiveButton({ ...initialActiveButton, newest: true });
	};
	const handleActive = () => {
		setFilteredData(activeList(allData));
		setIsActiveButton({ ...initialActiveButton, active: true });
	};
	const handleRecommend = () => {
		setFilteredData(recommendList(allData));
		setIsActiveButton({ ...initialActiveButton, recommend: true });
	};
	const handleUnanswered = () => {
		setFilteredData(unansweredList(allData));
		setIsActiveButton({ ...initialActiveButton, unanswered: true });
	};

	return (
		<HomeFilterContainer>
			<span className="total">{totalDataCount} questions</span>
			<div>
				<button
					className={`sort-button newest ${
						isActiveButton.newest ? 'active-button' : ''
					}`}
					type="button"
					onClick={handleNewest}
				>
					Newest
				</button>
				<button
					className={`sort-button active ${
						isActiveButton.active ? 'active-button' : ''
					}`}
					type="button"
					onClick={handleActive}
				>
					Active
				</button>
				<button
					className={`sort-button recommend ${
						isActiveButton.recommend ? 'active-button' : ''
					}`}
					type="button"
					onClick={handleRecommend}
				>
					Recommend
				</button>
				<button
					className={`sort-button unanswered ${
						isActiveButton.unanswered ? 'active-button' : ''
					}`}
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
	.active-button {
		color: white;
		background-color: #f48224;
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
