import { createContext, useState } from 'react';

const WarningContext = createContext();

const WarningContextProvider = ({ children }) => {
	const [visible, setVisible] = useState({
        deactivateUserWarning: false,
    });

	return (
		<WarningContext.Provider value={{ visible, setVisible }}>
			{children}
		</WarningContext.Provider>
	);
};

export { WarningContext, WarningContextProvider };
