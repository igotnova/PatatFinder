import { types } from "@babel/core";
import { DarkTheme } from "@react-navigation/native";
import React, {createContext} from "react";



const themeContext = createContext({
    theme:'light',
    color:'black',
    background:"white"
});


export default themeContext