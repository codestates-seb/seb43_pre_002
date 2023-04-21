import styled from 'styled-components';
import { useState } from 'react';
import AskDetail from './AskDetail';
import AskHelpler from './AskHelper';
import { detailHelperContents } from './askHelperContents';

function AskDetailBox({ register, detailRef }) {
	const [isDetailFocus, setIsDetailFocus] = useState(false);
	return (
		<AskDetailBoxContainer>
			<AskDetail
				setIsDetailFocus={setIsDetailFocus}
				register={register}
				detailRef={detailRef}
			/>
			{isDetailFocus ? <AskHelpler contents={detailHelperContents} /> : null}
		</AskDetailBoxContainer>
	);
}

export default AskDetailBox;

const AskDetailBoxContainer = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 1%;
`;
