import styled, { createGlobalStyle } from 'styled-components';
import MyHeader from '../../components/MyHeader';
import MyList from '../../components/MyList';

const lists1 = Array(5).fill({
	answerCount: 0,
	link: 'https://stackoverflow.com/',
	date: 'YYYY.MM.DD',
});

function MyActivity() {
	return (
		<Wrap>
			<GlobalStyles />
			<MyHeader />
			<ListColumn>
				<Post>
					<PostWrap>
						<Category>Ansewer</Category>
						<MyList lists={lists1} />
					</PostWrap>
					<PostWrap>
						<Category>Question</Category>
						<MyList lists={lists1} />
					</PostWrap>
				</Post>
				<Category2>Account</Category2>
				<MyList lists={lists1} />
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
