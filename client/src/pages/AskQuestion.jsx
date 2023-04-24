import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import NewQuestionHeader from '../components/AskQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';
import AskDetailBox from '../components/AskDetailBox';
import TryAndExpectBox from '../components/AskTryAndExpectBox';
import Submit from '../components/AskSubmit';

function NewQuestion() {
	const initialIsNext = {
		title: false,
		detail: false,
		tryAndExpect: false,
	};
	const { register, handleSubmit, setValue, watch } = useForm();
	const [isNext, setIsNext] = useState(initialIsNext);
	// 데이터 잘나오나 확인용 함수
	const onSubmit = (data) => console.log(data);
	return (
		<NewQuestionContainer onSubmit={handleSubmit(onSubmit)}>
			<NewQuestionHeader />
			<AskDescription />
			<AskTitleBox
				register={register}
				isNext={isNext}
				setIsNext={setIsNext}
				watch={watch}
			/>
			<AskDetailBox
				register={register}
				isNext={isNext}
				setIsNext={setIsNext}
				setValue={setValue}
				watch={watch}
			/>
			<TryAndExpectBox
				register={register}
				isNext={isNext}
				setIsNext={setIsNext}
				setValue={setValue}
				watch={watch}
			/>
			<Submit isNext={isNext} />
		</NewQuestionContainer>
	);
}

export default NewQuestion;

const NewQuestionContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 99vw;
	background-color: #f8f9f9; // 이미지 색깔
	padding: 0 8%;
`;
