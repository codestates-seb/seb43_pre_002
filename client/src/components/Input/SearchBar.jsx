import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { useRef } from 'react';

const SearchInputContainer = styled.div`
	display: flex;
	width: 800px;
	height: 30px;
	padding: 5px;
	margin: 0 50px;
	border: 1px solid var(--line-color);
	background-color: #fff;
	border-radius: 5px;
	cursor: text;
	&:focus-within {
		border-color: var(--main-color);
		box-shadow: 0 0 0 3px var(--main-color-lighten);
	}
`;

const SearchIcon = styled(IoIosSearch)`
	font-size: 18px;
	color: #b4b4b4;
`;

const SearchInput = styled.input`
	height: 100%;
	padding: 0 10px;
	border: none;
	outline: none;
	background-color: transparent;
`;

function SearchBar({ type, placeholder }) {
	const InputRef = useRef(null);

	const handleSearchClick = () => {
		InputRef.current.focus();
	};

	return (
		<SearchInputContainer onClick={handleSearchClick}>
			<SearchIcon />
			<SearchInput type={type} placeholder={placeholder} ref={InputRef} />
		</SearchInputContainer>
	);
}

export default SearchBar;
