/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import MyHeader from '../../components/MyHeader';
import MyList from '../../components/MyList';

function MyActivity() {
	const [userData, setUserData] = useState({});
	const { member_id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/members/${member_id}`, {
					headers: {
						'ngrok-skip-browser-warning': '69420',
					},
				});
				setUserData(result.data);
			} catch (error) {
				console.error(error);
				navigate('/');
			}
		};
		fetchData();
	}, []);

	const filteredArticles = userData.questions ? userData.questions : [];

	const filteredAnswerd = userData.answers ? userData.answers : [];

	const sortedArticles = filteredArticles.sort(
		(a, b) => b.voteCount - a.voteCount,
	);
	const sortedAnswers = filteredAnswerd.sort(
		(a, b) => b.voteCount - a.voteCount,
	);

	return (
		<Wrap>
			<GlobalStyles />
			<MyHeader />
			<ListColumn>
				<Post>
					<PostWrap>
						<Category>Ansewer</Category>
						<MyList lists={sortedAnswers.slice(0, 5)} />
					</PostWrap>
					<PostWrap>
						<Category>Question</Category>
						<MyList lists={sortedArticles.slice(0, 5)} />
					</PostWrap>
				</Post>
				<Category2>Account</Category2>
				<List>
					<ListTitle>
						<Ansewer>twitterLink : </Ansewer>
						<Title href={userData && userData.twitterLink}>
							{userData && userData.twitterLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>githubLink : </Ansewer>
						<Title href={userData && userData.githubLink}>
							{userData && userData.githubLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>notionLink : </Ansewer>
						<Title href={userData && userData.notionLink}>
							{userData && userData.notionLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>blogLink : </Ansewer>
						<Title href={userData && userData.blogLink}>
							{userData && userData.blogLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>websiteLink : </Ansewer>
						<Title href={userData && userData.websiteLink}>
							{userData && userData.websiteLink}
						</Title>
					</ListTitle>
				</List>
			</ListColumn>
		</Wrap>
	);
}
const Wrap = styled.div`
	margin-top: 50px;
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
const List = styled.ul`
	margin-top: 20px;
	padding: 0;
	width: 100%;
	border: 1.5px solid var(--line-color);
	border-radius: 5px;
	margin-bottom: 20px;
`;

const Title = styled.a`
	margin-left: 10px;
	text-align: center;
	color: var(--main-color);
	font-size: var(--font-large);
`;
const ListTitle = styled.li`
	border: 1px solid var(--line-color);
	padding: 10px;
	display: flex;
	flex-direction: row;
`;
const Ansewer = styled.span`
	margin-left: 10px;
	padding: 5px 0;
	font-size: var(--font-large);
`;
export default MyActivity;
