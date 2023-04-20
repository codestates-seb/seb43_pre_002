import styled from 'styled-components';
import { useState } from 'react';
import AskHelpler from './AskHelper';
import { tryAndExpectContents } from './askHelperContents';
import TryAndExpect from './AskTryAndExpect';

function TryAndExpectBox({ register }) {
	const [isTryAndExpectFocus, setIsTryAndExpectFocus] = useState(false);
	return (
		<TryAndExpectBoxContainer>
			<TryAndExpect
				setIsTryAndExpectFocus={setIsTryAndExpectFocus}
				register={register}
			/>
			{isTryAndExpectFocus ? (
				<AskHelpler contents={tryAndExpectContents} />
			) : null}
		</TryAndExpectBoxContainer>
	);
}

export default TryAndExpectBox;

const TryAndExpectBoxContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 1%;
`;
