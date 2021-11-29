import { Card, Table } from "react-bootstrap"
import { useState, useEffect } from 'react';

import { useAppSelector } from "../../../app/hooks";
import { fetchLtvSalesMonth } from '../../api/indicators';
import { selectFilterIndicator } from '../filterSlice';


interface SalesMonthItems {
  date: string;
  salesSum: string;
  saleUsersCount: number;
  month: "string",
  year: number,
  proportion: number
}
interface SalesMonthGroup {
  year: string,
  values: SalesMonthItems[]
}


function SalesMonth() {
  const filter = useAppSelector(selectFilterIndicator);
  const [data, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    (async () => {
      setPreloader(true)
      setData(await fetchLtvSalesMonth(filter))
    })().finally(() => setPreloader(false))
  }, [filter])

  return (
    <Card border="light" className={preloader ? "preloader" : null}>
      <Card.Body>
        <Card.Title>Продажи по месяцам</Card.Title>
        <Table>
            <thead>
              <tr>
                <th>Месяц</th>
                <th>Продажи</th>
                <th>Клиенты</th>
                <th>Доля от клиентов</th>
              </tr>
            </thead>
            <SalesMonthGroup data={data} />
          </Table>
      </Card.Body>
    </Card>
  )
}

export function SalesMonthGroup({data = []}: {data: SalesMonthGroup[]}) {
 if(data.length === 0) {
    return null
  } else if(data.length === 1) {
    const [group] = data;
    return (
      <tbody>
          {group.values.map((value, i) => (
            <Item key={i} data={value} />
          ))}
      </tbody>
    )
  } else {
    return (
      <>
        {
          data.map((group, i) => (
            <GroupItem key={i} year={group.year} data={group.values} />
          ))
        }
      </>
    )
  }
}

export function GroupItem({year, data = []}) {
  return (
    <>
      <thead className="thead-light">
          <tr className="thead-light">
            <td colSpan={3} className="table-active">
                <div className="text-center">{year}</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((value, i) => (
            <Item key={i} data={value} />
          ))}
        </tbody>
    </>
  )
}

export function Item({data}: {data: SalesMonthItems}) {
  return (
    <tr>
      <td>{data.month}</td>
      <td>{data.salesSum}</td>
      <td>{data.saleUsersCount}</td>
      <td>{data.proportion}</td>
    </tr>
  )
}



export default SalesMonth