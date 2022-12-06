import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen/homeScreen";
import { ValidationScreen } from "./screens/validationScreen/validationScreen";

export const LayoutScreens = () => {
    return (
        <BrowserRouter>
            <Routes>
                 <Route exact path={'/'} element={<HomeScreen />} />
                 <Route exact path={'/validation'} element={<ValidationScreen />} />
            </Routes>
        </BrowserRouter>
    );
};