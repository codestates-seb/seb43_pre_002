import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import NewQuestionHeader from '../components/AskQuestionHeader';
import AskDescription from '../components/AskDescription';
import AskTitleBox from '../components/AskTitleBox';
import AskDetailBox from '../components/AskDetailBox';
import AskTryAndExpectBox from '../components/AskTryAndExpectBox';
import AskSubmit from '../components/AskSubmit';
import AskSubmitModal from '../components/AskSubmitModal';

function AskQuestion() {
	const initialIsNext = {
		title: false,
		detail: false,
		tryAndExpect: false,
	};
	const { register, handleSubmit, setValue, watch } = useForm();
	const [isNext, setIsNext] = useState(initialIsNext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitData, setSubmitData] = useState({});
	const onSubmit = (data) => {
		setIsModalOpen(true);
		const body = {
			title: data.title,
			content: `${data.detail}</br>${data.tryAndExpect}`,
		};
		setSubmitData(body);
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
			<AskSubmitModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				submitData={submitData}
			/>
		</NewQuestionContainer>
	);
}

export default AskQuestion;

const NewQuestionContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 99vw;
	height: 180%;
	background-color: #f8f9f9; // 이미지 색깔
	padding: 0 8%;
`;
