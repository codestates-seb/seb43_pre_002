import styled from 'styled-components';

function Pagination() {
	return (
		<PaginationContainer>
			<button className="prev-button" type="button">
				Prev
			</button>
			<button className="page-number" type="button">
				1
			</button>
			<button className="page-number" type="button">
				2
			</button>
			<button className="page-number" type="button">
				3
			</button>
			<button className="page-number" type="button">
				4
			</button>
			<button className="page-number" type="button">
				5
			</button>
			<div className="dot">...</div>
			<button className="last-page" type="button">
				788093
			</button>
			<button className="next-button" type="button">
				Next
			</button>
		</PaginationContainer>
	);
}

export default Pagination;

const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	width: 40%;
	height: 90px;
	margin-left: 2%;
	.prev-button,
	.next-button,
	.last-page {
		width: 60px;
		height: 30px;
		background-color: white;
		border-radius: 5px;
		border-color: var(--line-color);
		cursor: pointer;
		&:hover {
			background-color: var(--line-color);
		}
	}
	.prev-button {
		margin-right: 5px;
	}
	.next-button {
		margin-left: 5px;
	}
	.page-number {
		width: 30px;
		height: 30px;
		margin-right: 1px;
		background-color: white;
		border-radius: 5px;
		border-color: var(--line-color);
		cursor: pointer;
		&:hover {
			background-color: var(--line-color);
		}
	}
	.dot {
		margin: 0 6px;
	}
`;
