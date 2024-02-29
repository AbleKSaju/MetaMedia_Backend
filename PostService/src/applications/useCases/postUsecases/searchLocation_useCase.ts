import axios from 'axios';
interface Data{
    data: string
}
export const searchLocation_useCase=(dependencies:any)=>{

  
    const executeFunction=async(data:Data)=>{
        
        
        if(data.data.trim()!==''){

            const result = await axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest?q=${data.data}&access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&session_token=ce8adf6d-f635-415e-ad83-7597a752bdfc&language=en&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory&proximity=76.3218144%2C9.9380786`);
            const suggestions = result.data.suggestions;

// Using map method to create an array of objects
const namesAndMapboxIds = suggestions.map((suggestion:any) => ({
    name: suggestion.name,
    mapbox_id: suggestion.mapbox_id
}));

console.log(namesAndMapboxIds,'hhiihihihihihih');



            return namesAndMapboxIds;


        }else{
           
            
            return []
        }
        
    }
    return {executeFunction} 

}







