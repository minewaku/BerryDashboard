import { createContext, useState } from 'react';
import { THEMES, MODES } from '~/store/constants';

const ThemeContext = createContext();
const ThemeProvider = (props) => {
    const [theme, setTheme] = useState({ mode: MODES[0], theme: THEMES[0] });
    const contextValue = {
        theme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider };
export default ThemeContext;
