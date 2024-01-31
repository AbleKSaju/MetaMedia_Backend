import express ,{Express} from 'express'

const expresscofig=(app:Express):void=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    
}

export default expresscofig