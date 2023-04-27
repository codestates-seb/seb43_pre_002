import styled from 'styled-components';

const UserProfileBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ boxSize }) => boxSize};
	height: ${({ boxSize }) => boxSize};
	border-radius: 5px;
	box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.25);
	background-color: #9370db;
`;

const UserProfileText = styled.span`
	font-size: ${({ fontSize }) => fontSize};
	font-weight: 800;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
	color: #fff;
`;

const getUserName = (str) => {
	const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	let userName = '';
	if (check.test(str)) {
		userName = str.substring(0, 3);
	} else {
		userName = str.substring(0, 4);
	}
	return userName;
};

function UserProfile({ userName, boxSize, fontSize }) {
	return (
		<UserProfileBox boxSize={boxSize}>
			<UserProfileText fontSize={fontSize}>
				{getUserName(userName)}
			</UserProfileText>
		</UserProfileBox>
	);
}

export default UserProfile;
