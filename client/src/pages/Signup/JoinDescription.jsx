import styled from 'styled-components';
import { RiQuestionnaireFill, RiArrowUpDownLine } from 'react-icons/ri';
import { IoIosPricetags, IoIosTrophy } from 'react-icons/io';

const DescriptionContainer = styled.div`
	max-width: 460px;
	margin-right: 48px;
`;

const Title = styled.h1`
	font-size: var(--font-title-large);
	margin-bottom: 32px;
`;

const List = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 24px;
	font-size: var(--font-large);
	.list-icon {
		font-size: 26px;
		color: var(--main-color);
		margin-right: 8px;
	}
`;

function JoinDescription() {
	return (
		<DescriptionContainer>
			<Title>Join the Stack Overflow community</Title>
			<List>
				<div className="list-icon">
					<RiQuestionnaireFill />
				</div>
				<div>Get unstuck — ask a question</div>
			</List>
			<List>
				<div className="list-icon">
					<RiArrowUpDownLine />
				</div>
				<div>Unlock new privileges like voting and commenting</div>
			</List>
			<List>
				<div className="list-icon">
					<IoIosPricetags />
				</div>
				<div>Save your favorite questions, answers, watch tags, and more</div>
			</List>
			<List>
				<div className="list-icon">
					<IoIosTrophy />
				</div>
				<div>Earn reputation and badges</div>
			</List>
		</DescriptionContainer>
	);
}

export default JoinDescription;
