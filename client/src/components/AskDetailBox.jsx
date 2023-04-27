import styled from 'styled-components';
import { useState } from 'react';
import AskDetail from './AskDetail';
import AskHelpler from './AskHelper';
import { detailHelperContents } from './askHelperContents';

function AskDetailBox({ register, isNext, setIsNext, setValue, watch }) {
	const [isDetailFocus, setIsDetailFocus] = useState(false);
	return (
		<AskDetailBoxContainer>
			{!isNext.title ? <div className="disabled" /> : null}
			<AskDetail
				setIsDetailFocus={setIsDetailFocus}
				register={register}
				setValue={setValue}
				watch={watch}
				isNext={isNext}
				setIsNext={setIsNext}
			/>
			{isDetailFocus ? <AskHelpler contents={detailHelperContents} /> : null}
		</AskDetailBoxContainer>
	);
}

export default AskDetailBox;

const AskDetailBoxContainer = styled.div`
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
