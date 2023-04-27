import styled from 'styled-components';
import { useState } from 'react';
import AskTitle from './AskTitle';
import AskHelpler from './AskHelper';
import { titleHelperContents } from './askHelperContents';

function AskTitleBox({ register, isNext, setIsNext, watch }) {
	const [isTitleFocus, setIsTitleFocus] = useState(false);
	return (
		<AskTitleBoxContainer>
			<AskTitle
				setIsTitleFocus={setIsTitleFocus}
				register={register}
				isNext={isNext}
				setIsNext={setIsNext}
				watch={watch}
			/>
			{isTitleFocus ? <AskHelpler contents={titleHelperContents} /> : null}
		</AskTitleBoxContainer>
	);
}

export default AskTitleBox;

const AskTitleBoxContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 1%;
`;
