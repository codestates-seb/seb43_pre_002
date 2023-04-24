import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

function SearchBar({ type, placeholder, searchTerm, setSearchTerm }) {
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();
	const InputRef = useRef(null);

	const handleSearchClick = () => {
		InputRef.current.focus();
	};

	const handleInputChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleSearch = (e) => {
		if (e.key === 'Enter') {
			setSearchTerm(searchInput);
			navigate('/');
			setSearchTerm(''); // 검색어 초기화
		}
	};

	return (
		<SearchInputContainer onClick={handleSearchClick}>
			<SearchIcon />
			<SearchInput
				type={type}
				placeholder={placeholder}
				ref={InputRef}
				value={searchInput}
				onChange={handleInputChange}
				onKeyUp={handleSearch}
			/>
		</SearchInputContainer>
	);
}

export default SearchBar;
