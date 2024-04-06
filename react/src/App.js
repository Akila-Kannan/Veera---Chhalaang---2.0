import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GlobalStyles, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import cheerio from "cheerio";
const { pipeline } = require('@xenova/transformers');
// const parse = require('url-parse');

async function summarizeURL(url) { 
    try {
        const summarizationPipeline =await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');// 
        //  const summarizationPipeline =await.pipeline({
        //     model: "t5-small",
        //     task: "summarization",
        // });
        const text = "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, "+
        "and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. " +
        "During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest " +
        "man-made structure in the world, a title it held for 41 years until the Chrysler Building in New " +
        "York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to " +
        "the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the " +
        "Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second " +
        "tallest free-standing structure in France after the Millau Viaduct.";

// const text ="my name is Akila ";

        // text.replace(/[^a-zA-Z ]/g, "") 



        // const result = await summarizationPipeline("http://tesseract.in");
       const result =  await summarizationPipeline(text, {
          max_new_tokens: 100,
        });
        console.log("summarize",result);

        // console.log(result);
        // return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

const url = 'YOUR_URL';
function App() {
  let arr =[];
 let inputData;
  const[searchCount,setSearchount] = useState([{title: "your search", message: ""}]);
  const[textin, setInputText] = useState("");
  function handleApi(e ){
    console.log(arr);
    let url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyB33h_6jQfJDyMrxDVaUT7ZHCtZKZFsNLE&cx=017576662512468239146:omuauf_lfve&q=yoga";
    console.log("url "+ url );
    search(inputData)
    // axios
    //         .get(
    //           url
    //             // 'https://developer.oculus.com/'
    //         )
    //         .then((response) => {
    //             const posts = response.data;
    //             if(response.data.items!= undefined)
    //             for(let i=0; i< response.data.items.length; i++ ){
    //             arr.push({title:response.data.items[0].link,message:""});
    //             }

    //             setSearchount(arr);
    //             console.log(response.data);

                
    //         });
            // summarizeURL("https://tesseract.in/");
           
          
            // const testSummarization = async () => 
            // {


            //   const options = {
            //     method: 'POST',
            //     url: 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer',
            //     headers: {
            //       'content-type': 'application/json',
            //       'X-RapidAPI-Key': 'b68f14204emsh135461edf2e45adp157c17jsna98f77c626f6',
            //       'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com'
            //     },
            //     data: {
            //       url: 'http://en.wikipedia.org/wiki/Automatic_summarization',
            //       text: '',
            //       sentnum: 8
            //     }
            //   };
              
            //   try {
            //     const response = await axios.request(options);
            //     console.log(response.data);
            //   } catch (error) {
            //     console.error(error);
            //   }
            // }
        
            // testSummarization();

  }
  async function search(searchTerm) {
    try {
      const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
        params: {
          key: "AIzaSyB33h_6jQfJDyMrxDVaUT7ZHCtZKZFsNLE",
          cx: "320485d5d813d401c",
          q: searchTerm,
        },
      });
      if(response.data.items!= undefined)
      for(let i=0; i< response.data.items.length; i++ ){
      arr.push({title:response.data.items[i].link,message:""});
      }

      setSearchount(arr);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, like displaying an error message to the user
    }
  }
 

  function textChange(e){
    inputData = e.target.value;
    console.log("input data "+ inputData);
    setInputText(e.target.value);
  }
  useEffect(() => {
    // Side effect code
    inputData = textin;
  }, [textin]);
  return (
    <div className="App">
   
      <main>
        <div class="flex-container">
          <div > <TextField id="outlined-basic" label="Enter whats on your mind" variant="outlined" onChange={textChange}/></div>
        <div>  <Button variant="contained" onClick={handleApi}> Search</Button></div>
      </div>

      <Box
     
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
      flexDirection="column"
    >
      This Box uses MUI System props for quick customization.{

         <div >
           {searchCount.map(item => (
      <div key={item.title}><div>{item.title}</div><div >{item.message}</div></div>
     
    ))}
           </div>
      }
     
    </Box>
      </main>

    </div>
  );
}

export default App;
