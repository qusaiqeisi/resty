import React from 'react';
import axios from 'axios';
import './app.scss';
import { useState, useEffect } from 'react';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App(props) {

  const [requestParams, setRequestParams] = useState({})
  const [result, setResult] = useState([])


  const callApi = (requestParams) => {
    // mock output
    console.log(requestParams);
    let reqBody = requestParams.reqBody
    let method = requestParams.method
    let url = requestParams.url
    if (method == 'post' || method == 'put') {
      axios[method](url, reqBody).then(results => {
        setResult([...result, results.data])
        setRequestParams({ ...requestParams, requestParams })
        //  requestParams:requestParams
      })
    }
    else {
      axios[method](url).then(results => {
        setResult([...result, results.data])
        setRequestParams({ ...requestParams, requestParams })
        console.log(result);
      })
    }
  }

  // This will run on every re-render of this component
  useEffect(() => {
    console.log("%c I RUN ON EVERY RE-RENDER", 'background:#ccc; color:red');
  });

  // This will run only when the name changes
  useEffect(() => {
    console.log(`%c I RUN ON requestParams CHANGE:method : ${requestParams.method}, URL : ${requestParams.url}`, 'background:#000; color:purple');
  }, [requestParams.method]);


  // can be a good case to do a GET request form an API
  useEffect(() => {
    console.log("Initial loading ", requestParams);
  }, []);

  //UNMOUNT
  useEffect(() => {
    return (() => {
      console.log("%c Component unmounted !!", "background:yellow; color:black")
    })
  });

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={result} />
      <Footer />
    </React.Fragment>
  );
}

export default App;






  // class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }
