  
// import React from 'react';
import axios from 'axios';
import { useState, useEffect,useReducer } from 'react';
import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history/History';

const initialState=[];

function reducer(history=initialState,action){
  const {type,payload}=action;
  switch (type) {
    case 'AddToHistory':
      console.log(history);
      history=[...history,payload];
      return history;
    default:
      return history;
  }
}
function addToHistory(url,method,result){

  return({
    type:'AddToHistory',
    payload:{
      url,
      method,
      result
    }
  })
}
function App() {
  const [history, dispatch] = useReducer(reducer, initialState)
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [requestBody, setRequestBody] = useState({});


  useEffect(async () => {
    setData(null);
    if (requestBody) {
      const result = await axios[requestParams.method](requestParams.url, JSON.parse(requestBody));
      const data = { headers: result.headers, count: result.data.count, results: result.data.results }
      setData(data);
      dispatch(addToHistory(requestParams.url,requestParams.method,data));
    } else {
      const result = await axios[requestParams.method](requestParams.url);
      const data = { headers: result.headers, count: result.data.count, results: result.data.results }
      setData(data);
      dispatch(addToHistory(requestParams.url,requestParams.method,data));
 
    }
  }, [requestParams]);

  function callApi(requestParams, requestBody) {
    // mock output
    setRequestParams(requestParams);
    setRequestBody(requestBody);
  }
  function historyfunc(result){
    setData(result);
  }
  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {history&&<History historyfunc={historyfunc} history={history} />}
      <Results data={data} />
      <Footer />
    </>
  )
}
export default App;



