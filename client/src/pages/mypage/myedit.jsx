/* eslint-disable camelcase */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled, { createGlobalStyle } from 'styled-components';
import ReactQuill from 'react-quill';
import MyHeader from '../../components/MyHeader';
import 'react-quill/dist/quill.snow.css';

function MyEdit() {
	const [userData, setUserData] = useState(null);
	const [aboutMe, setAboutMe] = useState('');
	const { register, handleSubmit, setValue } = useForm();
	const { member_id } = useParams();
	const navigate = useNavigate();

	const handleAboutMeChange = (value) => {
		setAboutMe(value);
	};

	const onSubmit = (data) => {
		if (!userData) {
			return;
		}
		axios
			.patch(`http://localhost:3000/member/${member_id}`, {
				displayName: data.displayName,
				title: data.title,
				aboutMe,
				twitterLink: data.twitterLink,
				blogLink: data.blogLink,
				websiteLink: data.websiteLink,
				githubLink: data.githubLink,
				notionLink: data.notionLink,
				version: userData.version,
			})
			.then((response) => {
				setUserData(response.data);
				navigate(`/myprofile/${member_id}`);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:3000/member/${member_id}`)
			.then((response) => {
				setUserData(response.data);
				setAboutMe(response.data.aboutMe);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [member_id]);

	useEffect(() => {
		if (userData) {
			setValue('displayName', userData.displayName);
			setValue('title', userData.title);
			setValue('aboutMe', userData.aboutMe);
			setValue('twitterLink', userData.twitterLink);
			setValue('blogLink', userData.blogLink);
			setValue('websiteLink', userData.websiteLink);
			setValue('githubLink', userData.githubLink);
			setValue('notionLink', userData.notionLink);
		}
	}, [userData, setValue]);

	return (
		<Wrap>
			<GlobalStyles />
			<MyHeader />
			<ContentsColumn>
				<Category>Edit your profile</Category>
				<SubTitle>Public information</SubTitle>
				{userData && (
					<EditWrap>
						<form onSubmit={handleSubmit(onSubmit)}>
							<EditCategory>Display name</EditCategory>
							<Input
								type="text"
								{...register('displayName')}
								defaultValue={userData.displayName}
							/>
							<EditCategory>Title</EditCategory>
							<Input
								type="text"
								{...register('title')}
								defaultValue={userData.title}
								placeholder="No title has been set"
							/>
							<EditCategory>About me</EditCategory>
							<ReactQuill
								style={{ height: '200px' }}
								defaultValue={userData.aboutMe}
								onChange={handleAboutMeChange}
								placeholder="Introduce Yourself"
							/>
							<div className="Accountdiv">
								<EditCategory>Account link</EditCategory>
								<AccountWrap>
									<Section>
										<EditCategory>Twitter link</EditCategory>

										<AccountInput
											type="text"
											{...register('twitterLink')}
											defaultValue={userData.twitterLink}
										/>
										<EditCategory>Blog link</EditCategory>
										<AccountInput
											type="text"
											{...register('blogLink')}
											defaultValue={userData.blogLink}
										/>
										<EditCategory>Website link</EditCategory>
										<AccountInput
											type="text"
											{...register('websiteLink')}
											defaultValue={userData.websiteLink}
										/>
									</Section>
									<Section>
										<EditCategory>Github link</EditCategory>
										<AccountInput
											type="text"
											{...register('githubLink')}
											defaultValue={userData.githubLink}
										/>
										<EditCategory>Notion link</EditCategory>
										<AccountInput
											type="text"
											{...register('notionLink')}
											defaultValue={userData.notionLink}
										/>
									</Section>
								</AccountWrap>
							</div>
							<PageButtons>
								<PageButton type="submit">Save</PageButton>
								<Link to={`/myprofile/${member_id}`}>
									<PageButton type="button">Cancel</PageButton>
								</Link>
							</PageButtons>
						</form>
					</EditWrap>
				)}
			</ContentsColumn>
		</Wrap>
	);
}

const Wrap = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	.Accountdiv {
		margin-top: 60px;
	}
`;

const Category = styled.span`
	font-size: 21px;
	font-weight: bold;
	width: 161px;
	border-bottom: 3px solid black;
`;
const ContentsColumn = styled.div`
	display: flex;
	width: 70vw;
	flex-direction: column;
`;
const SubTitle = styled.span`
	margin-top: 40px;
	font-size: 21px;
`;

const EditWrap = styled.div`
	width: 70vw;
	border: 2px solid var(--line-color);
	border-radius: 5px;
	padding: 20px 30px;
	margin-bottom: 20px;
`;
const EditCategory = styled.div`
	font-size: var(--font-large);
`;

const Input = styled.input`
	width: 40%;
	border: 2px solid var(--line-color);
	border-radius: 3px;
	margin-bottom: 20px;
`;

const AccountWrap = styled.div`
	display: flex;
	flex-direction: row;
	width: 90%;
	border: 2px solid var(--line-color);
	border-radius: 3px;
	margin-bottom: 20px;
	padding: 10px;
	justify-content: space-between;
`;
const Section = styled.div`
	width: 48%;
`;

const AccountInput = styled.input`
	width: 100%;
	border: 2px solid var(--line-color);
	border-radius: 3px;
	margin-bottom: 20px;
`;
const PageButtons = styled.div`
	margin-top: 40px;
`;

const PageButton = styled.button`
	margin-right: 10px;
	width: 70px;
	height: 30px;
	background-color: white;
	border: 3px solid var(--main-color);
	border-radius: 10px;
	font-size: var(--font--base);
	font-weight: bold;
	:hover {
		background-color: #3b6fa0;
		border: #3b6fa0;
		color: white;
	}
`;

const GlobalStyles = createGlobalStyle`
  #root{
	  display: flex;
	  justify-content: center;
  }
`;

export default MyEdit;
