/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Patient.scss';

const Patient = props => {
  const [conditionList, setConditionList] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const { patient, focus, setFocus } = props;

  async function fetchData() {
    const res = await fetch(
      `http://49.50.167.136:9871/api/patient/detail/${patient.personID}/condition`,
    );
    res.json().then(res => setConditionList(res.conditionList));

    const res2 = await fetch(
      `http://49.50.167.136:9871/api/patient/brief/${patient.personID}`,
    );
    res2.json().then(res => setVisitCount(res.visitCount));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnClick = () => {
    setFocus(patient.personID);
  };

  return (
    <div className="container" onClick={handleOnClick}>
      <div className="patient" key={patient.personID}>
        <div className="personId">{patient.personID}</div>
        <div className="gender">{patient.gender}</div>
        <div className="birthDatetime">{patient.birthDatetime}</div>
        <div className="age">{patient.age}</div>
        <div className="race">{patient.race}</div>
        <div className="ethnicity">{patient.ethnicity}</div>
        <div className="isDeath">{patient.isDeath ? 'true' : 'false'}</div>
      </div>
      {focus === patient.personID && (
        <div className="detail">
          <div>
            <p>Condition list</p>
            <ul>
              {conditionList.map((item, index) => {
                return <li>{item.conditionConceptID}</li>;
              })}
            </ul>
          </div>
          <p>Visit count: {visitCount}</p>
        </div>
      )}
    </div>
  );
};

export default Patient;
