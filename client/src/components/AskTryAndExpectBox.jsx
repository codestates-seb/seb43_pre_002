import styled from 'styled-components';
import { useState } from 'react';
import AskHelpler from './AskHelper';
import { tryAndExpectContents } from './askHelperContents';
import AskTryAndExpect from './AskTryAndExpect';

function AskTryAndExpectBox({ register, isNext, setIsNext, setValue, watch }) {
	const [isTryAndExpectFocus, setIsTryAndExpectFocus] = useState(false);
	return (
		<AskTryAndExpectBoxContainer>
			{!isNext.detail ? <div className="disabled" /> : null}
			<AskTryAndExpect
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
		</AskTryAndExpectBoxContainer>
	);
}

export default AskTryAndExpectBox;

const AskTryAndExpectBoxContainer = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	margin-bottom: 1%;
	.disabled {
		position: absolute;
		width: 65%;
		height: 350px;
		border-radius: 5px;
		opacity: 0.8;
		background-color: var(--line-color);
		z-index: 1;
		cursor: not-allowed;
	}
`;
