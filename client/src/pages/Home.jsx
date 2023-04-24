import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import HomeQuestionItem from '../components/HomeQuestionItem';
import HomeFooter from '../components/HomeFooter';
import { filterByTerm } from '../utils/filterFunction';

function Home({ searchTerm }) {
	const [allData, setAllData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [limitItems, setLimitItems] = useState(5);
	const totalDataCount = filteredData.length;

	useEffect(() => {
		setFilteredData(filterByTerm(allData, searchTerm));
	}, [allData, searchTerm]);

	useEffect(() => {
		axios
			.get('/questions', {
				headers: {
					'Content-Type': `application/json`,
					'ngrok-skip-browser-warning': '69420',
				},
			})
			.then((res) => {
				console.log(res.data.data);
				setAllData(res.data.data.reverse());
			});
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
				<HomeQuestionItem key={el.questionId} data={el} />
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
	width: 100vw;
	margin-top: 50px;
	overflow-y: scroll;
`;
