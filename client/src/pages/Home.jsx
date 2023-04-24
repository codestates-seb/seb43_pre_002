import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import HomeQuestionItem from '../components/HomeQuestionItem';
import HomeFooter from '../components/HomeFooter';

function Home() {
	const [allData, setAllData] = useState([]);
	const [filteredData, setFilteredData] = useState([...allData]);
	const [currentPage, setCurrentPage] = useState(1);
	const [limitItems, setLimitItems] = useState(5);
	const totalDataCount = filteredData.length;

	useEffect(() => {
		setFilteredData([...allData]);
	}, [allData]);

	useEffect(() => {
		axios
			.get('http://localhost:3001/datas')
			.then((res) => setAllData(res.data));
	}, []);
	const currentPageData = filteredData.slice(
		(currentPage - 1) * limitItems,
		currentPage * limitItems,
	);

	return (
		<HomeContainer>
			<HomeHeader />
			<HomeFilter
				totalDataCount={totalDataCount}
				allData={allData}
				setFilteredData={setFilteredData}
			/>
			{currentPageData.map((el) => (
				<HomeQuestionItem key={el.id} data={el} />
			))}
			<HomeFooter
				totalDataCount={totalDataCount}
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
	margin-top: 50px;
`;
