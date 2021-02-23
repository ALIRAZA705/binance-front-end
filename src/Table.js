import React from 'react'
export default function TableData(props) {
 
 console.log("table data :",props.dataapi[0]["Coin"],props.dataapi)
 const renderTableBody = () => {
  // console.log("props datta", props.client_data)
  return (
    
    props.dataapi.map((row, index) =>

          // <tr key={row}>
          // console.log("api of :",row)

              {row.toUpperCase()}
          // </th>

      )

  )
}
 
 
 
 
 return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>% Percentage</th>
          <th>Average Price </th>
          <th>Bolinger Average</th>
        </tr>
        </thead>
        <tbody>
          {/* {props.dataapi.map((row, index) => {
            <tr>
              <p>{row}</p>
              <td>{index}</td>
            <td>{row.BolingerAverage}</td> 
            <td>{props.dataapi[index]["Percentage"]}</td>
              <td>{props.dataapi[index]["CurrentPrice"]}</td>
              <td>{props.dataapi[index]["BolingerAverage"]}</td> 



            </tr>

          })} */}
                                               <tr>  {renderTableBody}</tr> 

        </tbody>
 
    </table>
  )
}