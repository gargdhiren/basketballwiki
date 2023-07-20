import React from 'react'
import useFetch from '../useFetch'
import Newcard from './Newcard';
function News() {
    
    const url=`https://newsapi.org/v2/everything?q=nba&apiKey=${process.env.REACT_APP_API_KEY}`;
    console.log(url);
    const {data,loading,error}=useFetch(url);
    if(error) {return(
        <p>Error...</p>
    )}
    if(loading){
        <p>Loading...</p>
    }
    if(data===null){
        return null;
    }
  return (
    <div style={{marginTop:'70px'}}>
    {
        data.map((news)=>(
            <Newcard News={news}/>
        ))
    }
    </div>
  )
}

export default News