/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Table.scss';

const Table = props => {
  const [data, setData] = useState([]);
  const {
    page,
    length,
    orderColumn,
    orderDesc,
    gender,
    race,
    ethnicity,
    ageMin,
    ageMax,
    death,
  } = props;

  async function fetchData() {
    let url = `http://49.50.167.136:9871/api/patient/list?page=${page}&length=${length}`;
    if (orderColumn) url += `&order_column=${orderColumn}`;
    if (orderDesc) url += `&order_desc=${orderDesc}`;
    if (gender) url += `&gender=${gender}`;
    if (race) url += `&race=${race}`;
    if (ethnicity) url += `&ethnicity=${ethnicity}`;
    if (ageMin) url += `&age_min=${ageMin}`;
    if (ageMax) url += `&age_max=${ageMax}`;
    if (death) url += `&death=${death}`;

    const res = await fetch(url);
    // eslint-disable-next-line no-shadow
    res.json().then(res => setData(res.patient.list));
  }

  useEffect(() => {
    fetchData();
  }, [props]);

  return (
    <div>
      <div className="tableHead">
        <div className="personId">personID</div>
        <div className="gender">gender</div>
        <div className="birthDatetime">birthDatetime</div>
        <div className="age">age</div>
        <div className="race">race</div>
        <div className="ethnicity">ethnicity</div>
        <div className="isDeath">isDeath</div>
      </div>
      {data.map((item, index) => {
        return (
          <div className="patient" key={item.personID}>
            <div className="personId">{item.personID}</div>
            <div className="gender">{item.gender}</div>
            <div className="birthDatetime">{item.birthDatetime}</div>
            <div className="age">{item.age}</div>
            <div className="race">{item.race}</div>
            <div className="ethnicity">{item.ethnicity}</div>
            <div className="isDeath">{item.isDeath ? 'true' : 'false'}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
