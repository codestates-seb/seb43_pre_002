import styled from 'styled-components';
import MyHeader from './myheader';

const lists = Array(10).fill({
	answerCount: 0,
	link: 'https://stackoverflow.com/',
	date: 'YYYY.MM.DD',
});

function MyProfile() {
	return (
		<Wrap>
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
				<PostList>
					{lists.map((list) => (
						<li key={list.id}>
							<div>
								<div>{list.answerCount}</div>
								<a href={list.link}>질문 링크, 질문 상세 페이지 이동</a>
							</div>
							<div>{list.date}</div>
						</li>
					))}
				</PostList>
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

const PostList = styled.ul`
	margin-top: 20px;
	width: 100%;
`;
export default MyProfile;
