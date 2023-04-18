import styled from 'styled-components';
import UserHeader from './userheader';

const lists = Array(5).fill({
	answerCount: 0,
	link: 'https://stackoverflow.com/',
	date: 'YYYY.MM.DD',
});

function UserActivity() {
	return (
		<Wrap>
			<UserHeader />
			<ListColumn>
				<Post>
					<PostWrap>
						<Category>Ansewer</Category>
						<PostList>
							{lists.map((list) => (
								<List key={list.id}>
									<ListTitle>
										<Ansewer>{list.answerCount}</Ansewer>
										<Title href={list.link}>
											질문 링크, 질문 상세 페이지 이동
										</Title>
									</ListTitle>
									<CreateDate>{list.date}</CreateDate>
								</List>
							))}
						</PostList>
					</PostWrap>
					<PostWrap>
						<Category>Question</Category>
						<PostList>
							{lists.map((list) => (
								<List key={list.id}>
									<ListTitle>
										<Ansewer>{list.answerCount}</Ansewer>
										<Title href={list.link}>
											질문 링크, 질문 상세 페이지 이동
										</Title>
									</ListTitle>
									<CreateDate>{list.date}</CreateDate>
								</List>
							))}
						</PostList>
					</PostWrap>
				</Post>
				<Category2>Account</Category2>
				<PostList>
					{lists.map((list) => (
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
	padding: 5px 0;
	color: var(--main-color);
	font-size: var(--font-large);
`;

const CreateDate = styled.div`
	color: #7a7a7a;
	padding: 5px 0;
	font-size: var(--font-base);
`;

const ListColumn = styled.div`
	display: flex;
	flex-direction: column;
`;
export default UserActivity;
