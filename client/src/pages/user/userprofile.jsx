/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import UserHeader from '../../components/UserHeader';
import MyList from '../../components/MyList';

function UserProfile() {
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

	const sortedArticles = filteredArticles.sort((a, b) => b.answer - a.answer);

	function isEmpty(value) {
		return value === null || value === undefined || value === '';
	}

	return (
		<Wrap>
			<GlobalStyles />
			<UserHeader />
			{userData && !isEmpty(userData[`${member_id - 1}`]?.aboutMe) && (
				<div>
					<Category>About</Category>
					<AboutBox>{userData[`${member_id - 1}`]?.aboutMe}</AboutBox>
				</div>
			)}
			<Post>
				<Category>Top posts</Category>
				<MyList lists={sortedArticles.slice(0, 10)} />
			</Post>
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
const AboutBox = styled.p`
	width: 70vw;
	height: 50px;
	border: 1.5px solid var(--line-color);
	white-space: pre-line;
	margin-top: 20px;
	border-radius: 5px;
	text-justify: center;
	padding: 10px 5px;
`;
const Category = styled.span`
	font-size: 21px;
	font-weight: bold;
	border-bottom: 3px solid black;
`;

const Post = styled.span`
	margin-top: 40px;
	width: 70vw;
`;

const GlobalStyles = createGlobalStyle`
	#root{
		display: flex;
		justify-content: center;
	}
`;

export default UserProfile;
