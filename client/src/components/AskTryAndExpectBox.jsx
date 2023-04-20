import styled from 'styled-components';
import { useState } from 'react';
import AskHelpler from './AskHelper';
import { tryAndExpectContents } from './askHelperContents';
import AskTryAndExpect from './AskTryAndExpect';

function AskTryAndExpectBox() {
	const [isTryAndExpectFocus, setIsTryAndExpectFocus] = useState(false);
	return (
		<AskTryAndExpectBoxContainer>
			<AskTryAndExpect setIsTryAndExpectFocus={setIsTryAndExpectFocus} />
			{isTryAndExpectFocus ? (
				<AskHelpler contents={tryAndExpectContents} />
			) : null}
		</AskTryAndExpectBoxContainer>
	);
}

export default AskTryAndExpectBox;

const AskTryAndExpectBoxContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 1%;
`;
