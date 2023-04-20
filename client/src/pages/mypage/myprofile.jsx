import styled, { createGlobalStyle } from 'styled-components';
import MyHeader from '../../components/MyHeader';
import MyList from '../../components/MyList';

const lists2 = Array(10).fill({
	answerCount: 0,
	link: 'https://stackoverflow.com/',
	date: 'YYYY.MM.DD',
});

function MyProfile() {
	return (
		<Wrap>
			<GlobalStyles />
			<MyHeader />
			<div>
				<Category>About</Category>
				<AboutBox>
					유저가 작성한 Aboutme 내용이 들어갑니다.유저가 About me에 작성한
					내용이 없을경우 hidden처리 합니다.
				</AboutBox>
			</div>
			<Post>
				<Category>Top posts</Category>
				<MyList lists={lists2} />
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
	padding-top: 5px;
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

export default MyProfile;
