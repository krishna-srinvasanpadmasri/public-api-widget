import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import '../styles/header.css';
export default function configuration(){
 return<>   
<p class='configuration-info'>You can obtain the configuration by navigating to Admin Settings and selecting the API Settings tab. for more &nbsp; 
    <a href='https://developers.freshchat.com/api/' target='_blank'>info</a>
    </p>
<br/>

 <Autocomplete
    options={
      [
          { label: 'staging', id: 1 },
          { label: 'US', id: 2 },
          { label: 'EU', id: 3 },
          { label: 'AU', id: 4 },
          { label: 'IN', id: 5 },
          { label: 'IN', id: 6 },
          { label: 'reports1', id: 7 }
      ]
      } 
    renderInput={(params) => <TextField {...params} label="Enviroment" />}
    class = 'mandate-input-field config-input'
    disableClearable={true}
    size='small'
  
  />
  <br/>

  
  </>
}