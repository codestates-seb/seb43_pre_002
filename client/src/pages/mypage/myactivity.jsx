/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import MyHeader from '../../components/MyHeader';
import MyList from '../../components/MyList';

function MyActivity() {
	const [userData, setUserData] = useState({});
	const [articleData, setArticleData] = useState([]);
	const { member_id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(`http://localhost:3000/member`);
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
				<MyList lists={sortedArticles.slice(0, 5)} />
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

export default MyActivity;
