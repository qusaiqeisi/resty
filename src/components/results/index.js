import React from 'react';
import Loading from '../Loading/Loading';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function Results(props) {
  return (
    <section>
    { props.data ?<JSONPretty data-testid="renderedData" data={props.data}></JSONPretty>  :  <Loading/>}
  </section>
  )
}

export default Results ;

// ++++++++++++++++++++++++++++++++++++++++++++ 

// import React from "react";

// function Results(props) {

//     return (
//         <section>
//             <pre>{props.data ? JSON.stringify(props.data, undefined, 2) : null}</pre>
//         </section>
//     )
// }

// export default Results;

