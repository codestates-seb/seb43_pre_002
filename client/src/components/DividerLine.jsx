import styled from 'styled-components';

const Line = styled.hr`
	width: 100%;
	height: 0.1px;
	border: none;
	background-color: var(--font-color-gray);
`;

// 컴포넌트간의 구분선
function DividerLine() {
	return <Line />;
}

export default DividerLine;
