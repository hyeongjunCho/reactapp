/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Patient from './Patient';
import './Table.scss';

const Table = props => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [focus, setFocus] = useState('');
  const {
    page,
    setPage,
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
    if (orderColumn && orderColumn !== 'null')
      url += `&order_column=${orderColumn}`;
    if (orderDesc) url += `&order_desc=${orderDesc}`;
    if (gender && gender !== 'null') url += `&gender=${gender}`;
    if (race && race !== 'null') url += `&race=${race}`;
    if (ethnicity && ethnicity !== 'null') url += `&ethnicity=${ethnicity}`;
    if (ageMin) url += `&age_min=${ageMin}`;
    if (ageMax) url += `&age_max=${ageMax}`;
    if (death && death !== 'null') url += `&death=${death}`;

    const res = await fetch(url);
    // eslint-disable-next-line no-shadow
    res.json().then(res => {
      setData(res.patient.list);
      setTotal(res.patient.totalLength);
    });
  }

  useEffect(() => {
    fetchData();
    setFocus('');
  }, [props]);

  const handlePageChange = data => {
    setPage(data.selected + 1);
  };

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
        return <Patient patient={item} focus={focus} setFocus={setFocus} />;
      })}

      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="break-me"
        pageCount={total / length}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Table;
