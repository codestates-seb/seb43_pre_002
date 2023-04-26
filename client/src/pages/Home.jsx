import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import HomeQuestionItem from '../components/HomeQuestionItem';
import HomeFooter from '../components/HomeFooter';
import { filterByTerm } from '../utils/filterFunction';

function Home() {
	const { searchTerm } = useSelector((state) => state.search);
	const [allData, setAllData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [limitItems, setLimitItems] = useState(5);
	const [isFailGet, setIsFailGet] = useState(false);
	const [homeMemberId, setHomeMemberId] = useState([]);
	const [allMember, setAllMember] = useState([]);
	const [currentPageData, setCurrentPageData] = useState([]);
	const totalDataCount = filteredData.length;

	useEffect(() => {
		setCurrentPageData(
			filteredData.slice(
				(currentPage - 1) * limitItems,
				currentPage * limitItems,
			),
		);
	}, [filteredData, currentPage, limitItems]);

	const func = async () => {
		const curId = currentPageData.map((el) => el.questionId);
		const res = await Promise.all(
			curId.map((el) => axios.get(`/questions/${el}`)),
		);
		const member = res.map((el) => el.data.memberId);
		setHomeMemberId(member);
	};

	useEffect(() => {
		axios
			.get(
				'http://ec2-13-209-76-120.ap-northeast-2.compute.amazonaws.com:8080/questions',
				{
					headers: {
						'Content-Type': `application/json`,
					},
				},
			)
			.then((res) => {
				setAllData(res.data.reverse());
			})
			.catch(() => {
				setIsFailGet(true);
			});

		axios
			.get(
				'http://ec2-13-209-76-120.ap-northeast-2.compute.amazonaws.com:8080/members',
				{
					headers: { 'Content-Type': `application/json` },
				},
			)
			.then((res) => setAllMember(res.data));
	}, []);

	useEffect(() => {
		setFilteredData(filterByTerm(allData, searchTerm));
		setCurrentPage(1);
	}, [allData, searchTerm]);

	useEffect(() => {
		func();
	}, [currentPageData]);

	const memberName = homeMemberId.map((memberId) => {
		const obj = allMember.find((el) => el.memberId === memberId);
		return obj ? obj.displayName : null;
	});

	return (
		<HomeContainer>
			<HomeHeader />
			<HomeFilter
				totalDataCount={totalDataCount}
				allData={allData}
				setFilteredData={setFilteredData}
			/>
			{isFailGet ? (
				<p className="fail-get-text">서버 상태가 원활하지 않습니다.</p>
			) : (
				currentPageData.map((el, idx) => (
					<HomeQuestionItem
						key={el.questionId}
						data={el}
						memberId={homeMemberId[idx]}
						memberName={memberName[idx]}
					/>
				))
			)}
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
	.fail-get-text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 150px;
		width: 80%;
		border-top: 1px solid var(--line-color);
	}
`;
