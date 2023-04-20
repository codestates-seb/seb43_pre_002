import styled from 'styled-components';
import DividerLine from '../components/DividerLine';

const TimelineContainer = styled.div`
	display: flex;
	flex-direction: column;

	/* border: black solid 1px; */

	align-items: center;
	width: 100vw;

	header {
		width: 100%;
		background-color: var(--main-color);
	}
	main {
		padding: 24px;
		display: flex;
		flex-direction: column;
		/* border: black solid 1px; */
		flex: 1;
		width: 90vw;
	}

	.sub__header {
		span {
			color: var(--main-color);
		}
		margin-bottom: 16px;
		h1 {
			font-size: var(--font-title-small);

			margin-bottom: 5px;
		}
		h2 {
			font-size: var(--font-large);
		}
	}

	.select__filter {
		margin-bottom: 16px;
		> span {
			font-weight: bold;
		}
		.select__box {
			display: flex;
			margin-top: 16px;
			> div {
				width: 150px;
				padding: 10px;
				text-align: center;
				border: var(--line-color) solid 0.1px;
				font-size: var(--font-base);
			}
		}
	}

	.table__container {
		> div {
			font-weight: bold;
			margin-bottom: 16px;
		}
		table {
			font-size: var(--font-base);
			width: 100%;
		}
		thead {
			background-color: var(--base-color);
		}
		th {
			font-weight: bold;
			text-align: left;
			height: 34px;
			padding-top: 8px;
			padding-bottom: 10px;
			padding-left: 5px;
			padding-right: 20px;
			> span {
				color: var(--main-color);
			}
		}
		td {
			padding-left: 5px;
			padding-top: 8px;
			padding-bottom: 8px;
			padding-right: 20px;
		}
		.toggle__format {
			text-align: right;
		}
	}
`;

function Timeline() {
	return (
		<TimelineContainer>
			<header>헤더</header>

			<main>
				<div className="sub__header">
					<h1>
						Timeline for
						<span> </span>
						<span>
							MSSQL: Merge two tables together using insert statement to match
							exact values into table 1
						</span>
					</h1>
					<h3>
						Current License: <span>CC BY-SA 4.0</span>
					</h3>
					<DividerLine />
				</div>

				<div className="select__filter">
					<span>Event filters</span>
					<div className="select__box">
						<div>Hide vote summaires</div>
						<div>Show vote summaries</div>
					</div>
				</div>

				<div className="table__container">
					<div>1 event</div>

					<table>
						<thead>
							<tr>
								<th>
									when <span>toggle format</span>
								</th>
								<th> what</th>
								<th> </th>
								<th>by</th>

								<th> license</th>
								<th>comment</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="toggle__format">Apr 14 at 3:20</td>
								<td>history</td>
								<td>edited</td>
								<td>user16217248</td>
								<td>CC BY-SA 4.0</td>
								<td>added 14 characters in body</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</TimelineContainer>
	);
}
export default Timeline;
