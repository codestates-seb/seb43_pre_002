/* eslint-disable camelcase */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function MyList({ lists }) {
	return (
		<PostList>
			{lists.map((list) => (
				<List key={list.id}>
					<ListTitle>
						<Ansewer>{list.voteCount ?? 0}</Ansewer>
						<Link to={`/question/${list.questionId}`}>
							<Title href={list.title}>{list.title}</Title>
						</Link>
					</ListTitle>
					<CreateDate>{list.createdAt.substring(0, 10)}</CreateDate>
				</List>
			))}
		</PostList>
	);
}

const PostList = styled.ul`
	margin-top: 20px;
	padding: 0;
	width: 100%;
	border: 1.5px solid var(--line-color);
	border-radius: 5px;
	margin-bottom: 20px;
`;

const List = styled.li`
	border: 1px solid var(--line-color);
	padding: 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const ListTitle = styled.div`
	display: flex;
	flex-direction: row;
`;

const Ansewer = styled.div`
	border: 1px solid var(--line-color);
	border-radius: 3px;
	width: 25px;
	height: 25px;
	text-align: center;
	padding: 5px 0;
	font-size: var(--font-base);
`;
const Title = styled.a`
	margin-left: 10px;
	text-align: center;
	color: var(--main-color);
	font-size: var(--font-large);
`;

const CreateDate = styled.div`
	color: #7a7a7a;
	padding: 5px 0;
	font-size: var(--font-base);
`;

export default MyList;
