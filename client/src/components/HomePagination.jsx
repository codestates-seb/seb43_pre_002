import styled from 'styled-components';

function HomePagination({
	totalData,
	limitItems,
	currentPage,
	setCurrentPage,
}) {
	const maxPages = Math.ceil(totalData / limitItems);
	const pageButtons = Array(5).fill();
	return (
		<PaginationContainer>
			<button
				type="button"
				className="button prev"
				onClick={() => {
					setCurrentPage(currentPage - 1);
				}}
				disabled={currentPage <= 1}
			>
				Prev
			</button>
			{currentPage > 4 ? (
				<div>
					<button
						type="button"
						className="button"
						onClick={() => setCurrentPage(1)}
					>
						{1}
					</button>
					<span className="dot">...</span>
				</div>
			) : null}
			{pageButtons.map((_, i) => {
				let key = i;
				if (maxPages > 5 && currentPage >= maxPages - 2)
					key = i + maxPages - 2 - currentPage;
				if (currentPage > 4) key = i + currentPage - 3;
				if (key + 1 > maxPages || key + 1 <= 0) return null;
				return (
					<button
						type="button"
						className={`button ${key + 1 === currentPage ? 'active' : ''}`}
						key={key}
						onClick={() => {
							setCurrentPage(key + 1);
						}}
						disabled={key >= maxPages}
					>
						{key + 1}
					</button>
				);
			})}
			{currentPage < maxPages - 2 ? (
				<div>
					<span className="dot">...</span>
					<button
						type="button"
						className="button"
						onClick={() => setCurrentPage(maxPages)}
					>
						{maxPages}
					</button>
				</div>
			) : null}
			<button
				type="button"
				className="button next"
				onClick={() => {
					setCurrentPage(currentPage + 1);
				}}
				disabled={currentPage >= maxPages}
			>
				Next
			</button>
		</PaginationContainer>
	);
}

export default HomePagination;

const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	width: 60%;
	height: 90px;
	margin-left: 2%;
	.button.active {
		color: white;
		background-color: #f48224;
	}
	div > .dot {
		margin: 0 0.5em;
	}
	.button {
		font-size: var(--font-large);
		margin: 0 0.2em;
		background-color: #fff;
		border: 1px solid #d9d9d9;
		border-radius: 3px;
		padding: 0.2em 0.5em;
		cursor: pointer;
		&:hover {
			background-color: #d9d9d9;
		}
		&:disabled {
			cursor: not-allowed;
		}
	}
	.prev,
	.next {
		width: 3.5em;
	}
`;
