import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GlobalStyles, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useState } from 'react';
function App() {
  let arr =[];
 
  const[searchCount,setSearchount] = useState([{title: "your search", message: ""}]);
  const[textin, setInputText] = useState("");
  function handleApi(e ){
    console.log(arr);
    axios
            .get(
                `https://jsonplaceholder.typicode.com/posts`
            )
            .then((response) => {
                const posts = response.data;
                arr.push({title:textin,message:"msg"});
                setSearchount(arr);
   
                
            });
  }
  function textChange(e){
    setInputText(e.target.value);
  }
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
