import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomeHeader() {
	const { isLogin } = useSelector((state) => state.login);
	const { searchTerm } = useSelector((state) => state.search);
	const navigate = useNavigate();
	const handleClick = () => {
		if (!isLogin) {
			navigate('/login');
			return;
		}
		navigate('/askquestion');
	};
	return (
		<HomeHeaderContainer>
			<h2 className="all">
				{searchTerm ? `${searchTerm} 검색결과` : 'All Questions'}
			</h2>
			<button className="ask-question" type="button" onClick={handleClick}>
				Ask Questions
			</button>
		</HomeHeaderContainer>
	);
}
export default HomeHeader;

const HomeHeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	min-height: 50px;
	background-color: white;
	padding: 0 10%;
	margin: 1% 0;
	.all {
		font-size: var(--font-title-large);
	}
	.ask-question {
		color: white;
		background-color: var(--main-color);
		width: 140px;
		height: 3em;
		font-size: var(--font-large);
		border: 1px inset var(--line-color);
		border-radius: 5px;
		padding: 0;
		cursor: pointer;
		&:hover {
			background-color: var(--button-hover-color);
		}
	}
`;
