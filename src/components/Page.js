/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Table from './Table';

const Page = () => {
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(10);
  const [orderColumn, setOrderColumn] = useState(null);
  const [orderDesc, setOrderDesc] = useState(false);
  const [gender, setGender] = useState(null);
  const [race, setRace] = useState(null);
  const [ethnicity, setEthnicity] = useState(null);
  const [ageMin, setAgeMin] = useState(null);
  const [ageMax, setAgeMax] = useState(null);
  const [death, setDeath] = useState(null);

  const [ethnicityList, setEthnicityList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [raceList, setRaceList] = useState([]);

  const changeLength = e => {
    setLength(e.target.value);
  };

  const changeOrderColumn = e => {
    setOrderColumn(e.target.value);
  };

  const changeOrderDesc = e => {
    setOrderDesc(e.target.value);
  };

  const changeGender = e => {
    setGender(e.target.value);
  };

  const changeRace = e => {
    setRace(e.target.value);
  };

  const changeEthnicity = e => {
    setEthnicity(e.target.value);
  };

  const changeAgeMin = e => {
    setAgeMin(e.target.value);
  };

  const changeAgeMax = e => {
    setAgeMax(e.target.value);
  };

  const changeDeath = e => {
    setDeath(e.target.value);
  };

  async function fetchData() {
    const res1 = await fetch('http://49.50.167.136:9871/api/ethnicity/list');
    res1.json().then(res => setEthnicityList(res.ethnicityList));

    const res2 = await fetch('http://49.50.167.136:9871/api/gender/list');
    res2.json().then(res => setGenderList(res.genderList));

    const res3 = await fetch('http://49.50.167.136:9871/api/race/list');
    res3.json().then(res => setRaceList(res.raceList));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="options">
        <div>
          <span>Length</span>
          <select value={length} onChange={changeLength}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <span>Order_column</span>
          <select value={orderColumn} onChange={changeOrderColumn}>
            <option value={null} hidden>
              null
            </option>
            <option value="person_id">person_id</option>
            <option value="gender">gender</option>
            <option value="birth">birth</option>
            <option value="race">race</option>
            <option value="ethnicity">ethnicity</option>
            <option value="death">death</option>
          </select>
        </div>
        <div>
          <span>Order_desc</span>
          <select value={orderDesc} onChange={changeOrderDesc}>
            <option value="true">내림차순</option>
            <option value="false">오름차순</option>
          </select>
        </div>
        <div>
          <span>Gender</span>
          <select value={gender} onChange={changeGender}>
            <option value={null} hidden>
              null
            </option>
            {genderList.map(item => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <span>Race</span>
          <select value={race} onChange={changeRace}>
            <option value={null} hidden>
              null
            </option>
            {raceList.map(item => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <span>Ethnicity</span>
          <select value={ethnicity} onChange={changeEthnicity}>
            <option value={null} hidden>
              null
            </option>
            {ethnicityList.map(item => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <span>Death</span>
          <select value={death} onChange={changeDeath}>
            <option value={null} hidden>
              null
            </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
      </div>
      <Table
        page={page}
        length={length}
        orderColumn={orderColumn}
        orderDesc={orderDesc}
        gender={gender}
        race={race}
        ethnicity={ethnicity}
        ageMin={ageMin}
        ageMax={ageMax}
        death={death}
      />
    </div>
  );
};

export default Page;
