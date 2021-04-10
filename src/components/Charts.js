/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Charts = () => {
  const [ethnicityList, setEthnicityList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [raceList, setRaceList] = useState([]);

  const [stats, setStats] = useState([]);

  const [chartByGender, setChartByGender] = useState([]);
  const [chartByRace, setChartByRace] = useState([]);
  const [chartByEthnicity, setChartByEthnicity] = useState([]);
  const [chartByRaceGender, setChartByRaceGender] = useState([]);
  const [chartByEthnicityGender, setChartByEthnicityGender] = useState([]);

  const calculateChart = () => {
    const chartObj = {};
    for (let i = 0; i < stats.length; i += 1) {
      if (!chartObj[stats[i].gender]) {
        chartObj[stats[i].gender] = stats[i].count;
      } else {
        chartObj[stats[i].gender] += stats[i].count;
      }

      if (!chartObj[stats[i].race]) {
        chartObj[stats[i].race] = stats[i].count;
      } else {
        chartObj[stats[i].race] += stats[i].count;
      }

      if (!chartObj[stats[i].ethnicity]) {
        chartObj[stats[i].ethnicity] = stats[i].count;
      } else {
        chartObj[stats[i].ethnicity] += stats[i].count;
      }

      if (!chartObj[`${stats[i].race} + ${stats[i].gender}`]) {
        chartObj[`${stats[i].race} + ${stats[i].gender}`] = stats[i].count;
      } else {
        chartObj[`${stats[i].race} + ${stats[i].gender}`] += stats[i].count;
      }

      if (!chartObj[`${stats[i].ethnicity} + ${stats[i].gender}`]) {
        chartObj[`${stats[i].ethnicity} + ${stats[i].gender}`] = stats[i].count;
      } else {
        chartObj[`${stats[i].ethnicity} + ${stats[i].gender}`] +=
          stats[i].count;
      }
    }

    const byGender = [];
    for (let i = 0; i < genderList.length; i += 1) {
      byGender.push([genderList[i], chartObj[genderList[i]]]);
    }

    const byRace = [];
    for (let i = 0; i < raceList.length; i += 1) {
      byRace.push([raceList[i], chartObj[raceList[i]]]);
    }

    const byEthnicity = [];
    for (let i = 0; i < ethnicityList.length; i += 1) {
      byEthnicity.push([ethnicityList[i], chartObj[ethnicityList[i]]]);
    }

    const byRaceGender = [];
    for (let i = 0; i < genderList.length; i += 1) {
      for (let j = 0; j < raceList.length; j += 1) {
        byRaceGender.push([
          `${raceList[j]} + ${genderList[i]}`,
          chartObj[`${raceList[j]} + ${genderList[i]}`],
        ]);
      }
    }

    const byEthnicityGender = [];
    for (let i = 0; i < genderList.length; i += 1) {
      for (let j = 0; j < ethnicityList.length; j += 1) {
        byEthnicityGender.push([
          `${ethnicityList[j]} + ${genderList[i]}`,
          chartObj[`${ethnicityList[j]} + ${genderList[i]}`],
        ]);
      }
    }

    setChartByGender(byGender);
    setChartByRace(byRace);
    setChartByEthnicity(byEthnicity);
    setChartByRaceGender(byRaceGender);
    setChartByEthnicityGender(byEthnicityGender);
  };

  async function fetchData() {
    const res1 = await fetch('http://49.50.167.136:9871/api/ethnicity/list');
    res1.json().then(res => setEthnicityList(res.ethnicityList));

    const res2 = await fetch('http://49.50.167.136:9871/api/gender/list');
    res2.json().then(res => setGenderList(res.genderList));

    const res3 = await fetch('http://49.50.167.136:9871/api/race/list');
    res3.json().then(res => setRaceList(res.raceList));

    const res4 = await fetch('http://49.50.167.136:9871/api/patient/stats');
    res4.json().then(res => setStats(res.stats));
  }

  useEffect(async () => {
    await fetchData();
    calculateChart();
  }, [stats.length]);

  return (
    <div classNames="charts">
      <Chart
        width="500px"
        height="300px"
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Task', 'Gender'], ...chartByGender]}
        options={{
          title: 'Gender',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        width="500px"
        height="300px"
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Task', 'Race'], ...chartByRace]}
        options={{
          title: 'Race',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        width="500px"
        height="300px"
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Task', 'Ethnicity'], ...chartByEthnicity]}
        options={{
          title: 'Ethnicity',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        width="500px"
        height="300px"
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Task', 'Race + Gender'], ...chartByRaceGender]}
        options={{
          title: 'Race + Gender',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        width="500px"
        height="300px"
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['Task', 'Ethnicity + Gender'], ...chartByEthnicityGender]}
        options={{
          title: 'Ethnicity + Gender',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default Charts;
