import styled from 'styled-components';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AskDetail({
	setIsDetailFocus,
	register,
	setValue,
	watch,
	isNext,
	setIsNext,
}) {
	const onBlur = () => setIsDetailFocus(false);
	const editorContent = watch('detail');
	const handleClick = () => {
		const newObj = { ...isNext, detail: true };
		setIsNext(newObj);
	};
	const onEditorStateChange = (editorState) => {
		setValue('detail', editorState);
	};
	useEffect(() => {
		register('detail', { required: true, minLength: 20 });
	}, [register]);
	return (
		<AskDetailContainer>
			<h5 className="title">What are the details of your problem?</h5>
			<div className="descriptor">
				Introduce the problem and expand on what you put in the title. Minimum
				20 characters.
			</div>
			<div className="input-container">
				<ReactQuill
					style={{ height: '200px' }}
					onFocus={() => setIsDetailFocus(true)}
					onBlur={onBlur}
					value={editorContent}
					onChange={onEditorStateChange}
				/>
			</div>
			{!isNext.detail ? (
				<button className="next" type="button" onClick={handleClick}>
					Next
				</button>
			) : null}
		</AskDetailContainer>
	);
}

export default AskDetail;

const AskDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 65%;
	height: 350px;
	padding: 1% 1% 1% 2%;
	background-color: white;
	border-radius: 5px;
	border: 1px solid var(--line-color);
	margin-right: 2%;
	.title {
		font-size: var(--font-large);
		font-weight: 700;
		margin: 1% 0;
	}
	.descriptor {
		font-size: var(--font-base);
		margin-bottom: 0.5%;
	}
	.input-container {
		width: 100%;
		height: 250px;
		margin-bottom: 1%;
	}
	.input-container__detail-input {
		width: 100%;
		height: 100%;
	}
	.next {
		color: white;
		background-color: var(--main-color);
		width: 6%;
		height: 2em;
		&:hover {
			background-color: #3b6fa0; // 전역변수로 바꾸기
		}
		cursor: pointer;
	}
`;
