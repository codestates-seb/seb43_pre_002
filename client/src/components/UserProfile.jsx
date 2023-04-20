import styled from 'styled-components';

const UserProfileBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ boxSize }) => boxSize};
	height: ${({ boxSize }) => boxSize};
	border-radius: 5px;
	box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.25);
	background-color: ${({ bgColor }) => bgColor};
`;

const UserProfileText = styled.span`
	font-size: ${({ fontSize }) => fontSize};
	font-weight: 800;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
	color: #fff;
`;

function UserProfile({ userName, boxSize, fontSize }) {
	const getRandomColor = () => {
		const colors = [
			'#ff7f50',
			'#87cefa',
			'#da70d6',
			'#6495ed',
			'#ff69b4',
			'#ba55d3',
			'#cd5c5c',
			'#ffb6c1',
			'#ffa07a',
			'#ffdab9',
			'#ffa500',
			'#9370db',
			'#ffc0cb',
			'#ff69b4',
			'#ff1493',
			'#ba55d3',
			'#1e90ff',
			'#8b008b',
		];
		const randomIndex = Math.floor(Math.random() * colors.length);
		return colors[randomIndex];
	};

	const bgColor = getRandomColor();

	return (
		<UserProfileBox bgColor={bgColor} boxSize={boxSize}>
			<UserProfileText fontSize={fontSize}>
				{userName.substring(0, 4)}
			</UserProfileText>
		</UserProfileBox>
	);
}

export default UserProfile;
