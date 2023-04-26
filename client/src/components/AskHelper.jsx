import styled from 'styled-components';

function AskTitleHelpler({ contents }) {
	return (
		<AskTitleHelperContainer size={contents[1]}>
			{contents[0]}
		</AskTitleHelperContainer>
	);
}

export default AskTitleHelpler;

const AskTitleHelperContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	height: ${({ size }) => `${size}px`};
	@media screen and (max-width: 800px) {
		display: none;
	}
	.title {
		display: flex;
		align-items: center;
		width: 100%;
		height: 40px;
		background-color: var(--base-color);
		border: 1px solid var(--line-color);
		border-radius: 5px 5px 0 0;
		font-size: var(--font-large);
		font-weight: 700;
		padding-left: 1%;
	}
	.descriptor {
		display: flex;
		width: 100%;
		height: 75%;
		background-color: white;
		padding: 1%;
		border: solid var(--line-color);
		border-width: 0 1px 1px 1px;
		border-radius: 0 0 5px 5px;
		p {
			font-size: var(--font-base);
			margin: 1em 0;
			@media screen and (max-width: 1100px) {
				font-size: var(--font-small);
			}
		}
	}
	.descriptor__icon {
		width: 20%;
		padding: 3% 0 0 3%;
		@media screen and (max-width: 1100px) {
			padding: 1% 0 0 1%;
		}
	}
	.descriptor__contents {
		width: 80%;
	}
`;
