/* eslint-disable camelcase */
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled, { createGlobalStyle } from 'styled-components';
import MyHeader from '../../components/MyHeader';

function MyEdit() {
	const [userData, setUserData] = useState(null);
	const { register, handleSubmit, setValue } = useForm();
	const { member_id } = useParams();
	const navigate = useNavigate();

	// Define a function to handle form submission
	const onSubmit = (data) => {
		if (!userData) {
			return;
		}
		axios
			.patch(` http://localhost:3000/data/${member_id}`, {
				displayName: data.displayName,
				title: data.title,
				aboutMe: data.aboutMe,
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
			.get(` http://localhost:3000/data/${member_id}`)
			.then((response) => {
				setUserData(response.data);
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
				<SubTitle>Public infomation</SubTitle>
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
							<Textarea
								type="text"
								{...register('aboutMe')}
								defaultValue={userData.aboutMe}
								placeholder="Introduce Yourself"
							/>
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
`;

const Category = styled.span`
	font-size: 21px;
	font-weight: bold;
	width: 161px;
	border-bottom: 3px solid black;
`;
const ContentsColumn = styled.div`
	margin-top: 20px;
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

const Textarea = styled.textarea`
	width: 90%;
	height: 20vh;
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