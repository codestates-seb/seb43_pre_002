import styled from 'styled-components';
import { useState } from 'react';
import AskTitle from './AskTitle';
import AskHelpler from './AskHelper';
import { titleHelperContents } from './askHelperContents';

function AskTitleBox() {
	const [isTitleFocus, setIsTitleFocus] = useState(false);
	return (
		<AskTitleBoxContainer>
			<AskTitle setIsTitleFocus={setIsTitleFocus} />
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
