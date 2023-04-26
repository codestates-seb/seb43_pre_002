import styled from 'styled-components';
import { useEffect, useState } from 'react';
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
	const [isValid, setIsValid] = useState(false);
	const editorContent = watch('detail');
	const onBlur = () => setIsDetailFocus(false);
	const handleClick = () => {
		const leng = editorContent ? editorContent.length : 0;
		if (leng < 27) {
			setIsValid(true);
			return;
		}
		const newObj = { ...isNext, detail: true };
		setIsNext(newObj);
		setIsValid(false);
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
			{isValid ? <p className="invalid">20자 이상 작성해주세요!</p> : null}
		</AskDetailContainer>
	);
}

export default AskDetail;

const AskDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 65%;
	height: 350px;
	padding: 1% 1% 1% 2%;
	background-color: white;
	border-radius: 5px;
	border: 1px solid var(--line-color);
	margin-right: 2%;
	@media screen and (max-width: 800px) {
		width: 100%;
	}
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
		width: 45px;
		height: 2em;
		&:hover {
			background-color: var(--button-hover-color);
		}
		cursor: pointer;
	}
	.invalid {
		position: absolute;
		bottom: 4%;
		left: 11%;
		color: red;
	}
`;
