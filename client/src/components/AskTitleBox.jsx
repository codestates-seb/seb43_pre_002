import styled from 'styled-components';
import { useState } from 'react';
import AskTitle from './AskTitle';
import AskTitleHelpler from './AskTitleHelper';

function AskTitleBox() {
	const [isTitleFocus, setIsTitleFocus] = useState(false);
	return (
		<AskTitleBoxContainer>
			<AskTitle setIsTitleFocus={setIsTitleFocus} />
			{isTitleFocus ? <AskTitleHelpler /> : null}
		</AskTitleBoxContainer>
	);
}

export default AskTitleBox;

const AskTitleBoxContainer = styled.div`
	display: flex;
`;
