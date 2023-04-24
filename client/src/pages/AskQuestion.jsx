import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import NewQuestionHeader from '../components/AskQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';
import AskDetailBox from '../components/AskDetailBox';
import AskTryAndExpectBox from '../components/AskTryAndExpectBox';
import AskSubmit from '../components/AskSubmit';

function AskQuestion() {
	const initialIsNext = {
		title: false,
		detail: false,
		tryAndExpect: false,
	};
	const { register, handleSubmit, setValue, watch } = useForm();
	const [isNext, setIsNext] = useState(initialIsNext);
	// 데이터 잘나오나 확인용 함수
	const onSubmit = (data) => {
		const body = {
			title: data.title,
			content: `${data.detail}</br>${data.tryAndExpect}`,
		};
		axios
			.post('/questions', JSON.stringify(body), {
				headers: {
					'Content-Type': `application/json`,
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then((res) => console.log(res.data));
	};
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
			<AskTryAndExpectBox
				register={register}
				isNext={isNext}
				setIsNext={setIsNext}
				setValue={setValue}
				watch={watch}
			/>
			<AskSubmit isNext={isNext} />
		</NewQuestionContainer>
	);
}

export default AskQuestion;

const NewQuestionContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 99vw;
	background-color: #f8f9f9; // 이미지 색깔
	padding: 0 8%;
`;
