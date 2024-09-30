import '../styles/NeoPage.css';
import Header from './header';
import React,{useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';

export default function NeoPage(){
    const [token,setToken] = useState(null);
    const handleChange = (e) => {
        setToken(e.target.value)  
    }

    function showToaster(successText){
        toast.success(successText, {
         position: "top-center",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: false,
         draggable: false,
         progress: undefined,
         theme: "colored",
         intent: "success"
             })  }
    const [account,setAccount] = useState([]);
    // useEffect(()=>{
    //     fetch('https://staging.freshpori.com/v2/accounts/confguration',
    //         {
    //           method: "GET",
    //         headers:{
    //         //   "Content-type": "application/json; charset=UTF-8",
    //           "Authorization": `Bearer ${token}`,
    //           "accept": "application/json"
    //         }})
    //     .then((response)=> response.json())
    //     .then((json)=>setAccount(json))
    // },[]);
    console.log(account);
    console.log(token);
     function getAccount(){
        fetch('https://staging.freshpori.com/v2/accounts/configuration',
            {
              method: "GET",
            headers:{
            //    "Authorization": `${token}`
"Authorization": 'Bearer eyJraWQiOiJjdXN0b20tb2F1dGgta2V5aWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmcmVzaGNoYXQiLCJzdWIiOiI5NjdhNGRjMS03ZDc5LTQ1OWUtODUyNC04ZDRiMzZmMTAwZmYiLCJjbGllbnRJZCI6ImZjLTM2M2Y1YThlLTAzYTUtNGIwZC05MTRiLWYzNTg4M2IxNDY3MSIsInNjb3BlIjoiYWdlbnQ6cmVhZCBhZ2VudDpjcmVhdGUgYWdlbnQ6dXBkYXRlIGFnZW50OmRlbGV0ZSBjb252ZXJzYXRpb246Y3JlYXRlIGNvbnZlcnNhdGlvbjpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgbWVzc2FnZTpnZXQgYmlsbGluZzp1cGRhdGUgcmVwb3J0czpmZXRjaCByZXBvcnRzOmV4dHJhY3QgcmVwb3J0czpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIGFjY291bnQ6cmVhZCBkYXNoYm9hcmQ6cmVhZCB1c2VyOnJlYWQgdXNlcjpjcmVhdGUgdXNlcjp1cGRhdGUgdXNlcjpkZWxldGUgb3V0Ym91bmRtZXNzYWdlOnNlbmQgb3V0Ym91bmRtZXNzYWdlOmdldCBtZXNzYWdpbmctY2hhbm5lbHM6bWVzc2FnZTpzZW5kIG1lc3NhZ2luZy1jaGFubmVsczptZXNzYWdlOmdldCBtZXNzYWdpbmctY2hhbm5lbHM6dGVtcGxhdGU6Y3JlYXRlIG1lc3NhZ2luZy1jaGFubmVsczp0ZW1wbGF0ZTpnZXQgZmlsdGVyaW5ib3g6cmVhZCBmaWx0ZXJpbmJveDpjb3VudDpyZWFkIHJvbGU6cmVhZCBpbWFnZTp1cGxvYWQiLCJpc3MiOiJmcmVzaGNoYXQiLCJ0eXAiOiJCZWFyZXIiLCJleHAiOjIwMzM4NzY1OTIsImlhdCI6MTcxODM0Mzc5MiwianRpIjoiOTRiNWJmOGUtYzVmZC00YTg4LWJlNzEtMzFmMGRkNjEwMWVhIn0.i_M_3NEZdVvfO5rO5JCDTtq4SC5VAzeuNOqhtd9XaIQ'
            }
          }).then(async (response)=>    {
            await new Promise(r => setTimeout(r, 2000));
            showToaster("User added successfully!");
            console.log(response);
        }
        );

          
         
    }
    async function fetchConfiguration() {
        try {
          const response = await fetch('https://staging.freshpori.com/v2/accounts/configuration', {
            method: "GET",
            headers: {
              "Authorization": 'Bearer eyJraWQiOiJjdXN0b20tb2F1dGgta2V5aWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...'
            }
          });
          // Check if the response is successful (status code 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Parse and log the response
          const data = await response.json(); // Assuming the response is in JSON format
          console.log(data);
      
        } catch (error) {
          // Handle any errors
          console.error('Error fetching the configuration:', error);
        }
      }




    return (<>
    <Header titleText = {'Home'}/>
    <p>This api is used to get account related info: from account/configuration</p>
    <div>
    <TextField
        required
        label="Required"
        defaultValue="Bearer <token>"
        variant="filled"
        className='config-input'
        id = 'token'
        name= 'token'
        onClick={handleChange}
    /></div>
        <Button variant="contained" onClick={getAccount}>Get Account</Button>
        <code>{account}</code>
        <ToastContainer />
    </>);
}
 