/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import UserHeader from '../../components/UserHeader';
import MyList from '../../components/MyList';

function UserProfile() {
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

	const sortedArticles = filteredArticles.sort(
		(a, b) => b.voteCount - a.voteCount,
	);

	function isEmpty(value) {
		return value === null || value === undefined || value === '';
	}

	const html = userData.aboutMe;
	const plainText = html
		? new DOMParser().parseFromString(html, 'text/html').body.textContent
		: null;

	return (
		<Wrap>
			<GlobalStyles />
			<UserHeader />
			{userData && !isEmpty(userData.aboutMe) && (
				<div>
					{plainText ? (
						<>
							<Category>About</Category>
							<AboutBox>{plainText}</AboutBox>
						</>
					) : null}
				</div>
			)}
			<Post style={{ marginTop: plainText ? '40px' : '0px' }}>
				<Category>Top posts</Category>
				<MyList lists={sortedArticles.slice(0, 10)} />
			</Post>
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
