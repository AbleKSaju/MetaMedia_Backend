import axios from "axios";
interface Data {
  data: string;
}
export const getLatAndLog_useCase = (dependencies: any) => {
  const executeFunction = async (data: any) => {
    if (data.id.trim() !== "") {
      const result = await axios.get(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${data.id}?session_token=0b8c2c6f-92e6-4881-88db-646ec9d0327d&access_token=pk.eyJ1IjoicmF6aWs0NDQiLCJhIjoiY2xzcHUwcjdmMHVvZDJsazVwOHl1bmEybiJ9.MtBXtsFcyIVyE81W6OKIYg`
      );

      console.log(result.data.features[0].properties.coordinates, "tHHHH");

      return result.data.features[0].properties.coordinates;
    } else {
      return [];
    }
  };
  return { executeFunction };
};
