import express from "express";
import highlightRouter from "./HighlightRouter/highlightRouter";
import storyRouter from "./StoryRouter/storyRouter";

export const routes=(dependencies:any)=>{
    
    const routes = express.Router()

    routes.use('/highlight',highlightRouter(dependencies))

    routes.use('/story',storyRouter(dependencies))

    return routes
}