import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import HomeQuestionItem from '../components/HomeQuestionItem';
import HomeFooter from '../components/HomeFooter';

function Home() {
	const mapArr = [1, 2, 3, 4, 5, 6];
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [limitItems, setLimitItems] = useState(5);
	useEffect(() => {
		axios.get('http://localhost:3001/datas').then((res) => setData(res.data));
	}, []);
	return (
		<HomeContainer>
			<HomeHeader />
			<HomeFilter />
			{mapArr.map((el) => (
				<HomeQuestionItem key={el} />
			))}
			<HomeFooter
				data={data}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				limitItems={limitItems}
				setLimitItems={setLimitItems}
			/>
		</HomeContainer>
	);
}
export default Home;

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	width: 98vw;
`;
