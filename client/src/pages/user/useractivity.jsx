/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import UserHeader from '../../components/UserHeader';
import MyList from '../../components/MyList';

function UserActivity() {
	const [userData, setUserData] = useState({});
	const [articleData, setArticleData] = useState([]);
	const { member_id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(` http://localhost:3000/data`);
			setUserData(result.data);

			const articleResult = await axios.get(`http://localhost:3000/question`);
			setArticleData(articleResult.data);
		};
		fetchData();
	}, []);

	const filteredArticles = articleData
		? articleData.filter((a) => a.memberId === parseInt(member_id, 10))
		: [];

	const filteredAnswerd = articleData
		? articleData.filter((a) => a.answerId === parseInt(member_id, 10))
		: [];

	const sortedArticles = filteredArticles.sort((a, b) => b.answer - a.answer);
	const sortedAnswers = filteredAnswerd.sort((a, b) => b.answer - a.answer);

	return (
		<Wrap>
			<GlobalStyles />
			<UserHeader />
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
						<Title
							href={
								userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].twitterLink
							}
						>
							{userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].twitterLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>githubLink : </Ansewer>
						<Title
							href={
								userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].githubLink
							}
						>
							{userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].githubLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>notionLink : </Ansewer>
						<Title
							href={
								userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].notionLink
							}
						>
							{userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].notionLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>blogLink : </Ansewer>
						<Title
							href={
								userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].blogLink
							}
						>
							{userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].blogLink}
						</Title>
					</ListTitle>
					<ListTitle>
						<Ansewer>websiteLink : </Ansewer>
						<Title
							href={
								userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].twitterLink
							}
						>
							{userData[`${member_id - 1}`] &&
								userData[`${member_id - 1}`].websiteLink}
						</Title>
					</ListTitle>
				</List>
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
	padding: 5px 0;
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
export default UserActivity;
