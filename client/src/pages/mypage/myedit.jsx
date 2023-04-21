/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import MyHeader from '../../components/MyHeader';

const apiUrl = 'http://localhost:3000/member';

function MyEdit() {
	const [userData, setUserData] = useState(null);
	const { register, handleSubmit, reset } = useForm();
	const { member_id } = useParams();

	// Define a function to handle form submission
	const onSubmit = (data) => {
		axios
			.patch(`${apiUrl}/${userData.id}`, data)
			.then((response) => {
				console.log(response.data);
				// Reset form fields after successful submission
				reset();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		axios
			.get(apiUrl)
			.then((response) => {
				setUserData(response.data[`${member_id - 1}`]);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

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
								<PageButton type="button">Cancel</PageButton>
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
