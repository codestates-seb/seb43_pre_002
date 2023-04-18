import styled from 'styled-components';
import MyHeader from './myheader';

function MyEdit() {
	return (
		<Wrap>
			<MyHeader />
			<ContentsColumn>
				<Category>Edit your profile</Category>
				<SubTitle>Public infomation</SubTitle>
				<EditWrap>
					<EditCategory>Display name</EditCategory>
					<Input type="text" />
					<EditCategory>Title</EditCategory>
					<Input type="text" placeholder="No title has been set" />
					<EditCategory>About me</EditCategory>
					<Textarea type="text" placeholder="Introduce Yourself" />
					<EditCategory>Account link</EditCategory>
					<AccountWrap>
						<Section>
							<EditCategory>Twitter link</EditCategory>
							<AccountInput type="text" />
							<EditCategory>Blog link</EditCategory>
							<AccountInput type="text" />
							<EditCategory>Website link</EditCategory>
							<AccountInput type="text" />
						</Section>
						<Section>
							<EditCategory>Github link</EditCategory>
							<AccountInput type="text" />
							<EditCategory>Notion link</EditCategory>
							<AccountInput type="text" />
						</Section>
					</AccountWrap>
					<PageButtons>
						<PageButton type="button">Save</PageButton>
						<PageButton type="button">Cancel</PageButton>
					</PageButtons>
				</EditWrap>
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

export default MyEdit;
