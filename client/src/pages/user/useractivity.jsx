import styled, { createGlobalStyle } from 'styled-components';
import UserHeader from '../../components/UserHeader';
import MyList from '../../components/MyList';

const lists1 = Array(5).fill({
	answerCount: 0,
	link: 'https://stackoverflow.com/',
	date: 'YYYY.MM.DD',
});

function UserActivity() {
	return (
		<Wrap>
			<GlobalStyles />
			<UserHeader />
			<ListColumn>
				<Post>
					<PostWrap>
						<Category>Ansewer</Category>
						<MyList lists={lists1} />
					</PostWrap>
					<PostWrap>
						<Category>Question</Category>
						<MyList lists={lists1} />
					</PostWrap>
				</Post>
				<Category2>Account</Category2>
				<PostList>
					{lists1.map((list) => (
						<List key={list.id}>
							<ListTitle>
								<Title href={list.link}>
									{`프로필에 작성한 계정: ${`링크`}`}
								</Title>
							</ListTitle>
						</List>
					))}
				</PostList>
			</ListColumn>
		</Wrap>
	);
}
const Wrap = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

const Category = styled.span`
	font-size: 21px;
	font-weight: bold;
	border-bottom: 3px solid black;
`;

const Category2 = styled.span`
	font-size: 21px;
	font-weight: bold;
	text-decoration: underline 3px solid black;
`;

const Post = styled.span`
	margin-top: 10px;
	width: 70vw;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const PostWrap = styled.div`
	width: 48%;
`;

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

const Title = styled.a`
	margin-left: 10px;
	padding: 5px 0;
	color: var(--main-color);
	font-size: var(--font-large);
`;

const ListColumn = styled.div`
	display: flex;
	flex-direction: column;
`;

const GlobalStyles = createGlobalStyle`
	#root{
		display: flex;
		justify-content: center;
	}
`;
export default UserActivity;
