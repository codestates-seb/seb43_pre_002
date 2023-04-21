import styled from 'styled-components';
import { useState } from 'react';
import AskHelpler from './AskHelper';
import { tryAndExpectContents } from './askHelperContents';
import TryAndExpect from './AskTryAndExpect';

function TryAndExpectBox({ register, isNext, setIsNext, setValue, watch }) {
	const [isTryAndExpectFocus, setIsTryAndExpectFocus] = useState(false);
	return (
		<TryAndExpectBoxContainer>
			<TryAndExpect
				setIsTryAndExpectFocus={setIsTryAndExpectFocus}
				register={register}
				setValue={setValue}
				watch={watch}
				isNext={isNext}
				setIsNext={setIsNext}
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
