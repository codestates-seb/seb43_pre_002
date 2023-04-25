import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../reducers/searchSlice';
import SearchBar from '../Input/SearchBar';
import Logo from './Logo';
import AuthButtons from './AuthButtons';
import UserActionButtons from './UserActionButtons';

const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	width: 100%;
	padding: 0 20px;
	background-color: #eee;
	box-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.25);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
`;

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	max-width: 100%;
	height: 100%;
	margin: 0 auto;
`;

function LoginHeader() {
	const dispatch = useDispatch();
	const isLogin = useSelector((state) => state.login);
	return (
		<Header>
			<HeaderContainer>
				<Link to="/" onClick={() => dispatch(setSearchTerm(''))}>
					<Logo />
				</Link>
				<SearchBar type="text" placeholder="검색어를 입력하세요." />
				{isLogin === true ? <UserActionButtons /> : <AuthButtons />}
			</HeaderContainer>
		</Header>
	);
}

export default LoginHeader;
