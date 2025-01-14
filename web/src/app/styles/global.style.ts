import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
	${reset}

	* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
	
	:root {
		/* Color styles */
		--navy: rgba(15, 23, 42, 1);
		--blue: rgba(86, 98, 246, 1);
		--gray-blue: rgba(203, 213, 225, 1);
		--light-gray: rgba(247, 247, 247, 1);
		--dark-gray: rgba(169, 169, 169, 1);
		--white: #ffffff;
		--black: #000000;

		/* Text-size styles */
		--lg-small: 20px;
		--semi-bold--xs: 9px;
		--semi-bold--sm: 9px;
		--semi-bold--md: 14px;
		--semi-bold--md-small: 17px;
		--semi-bold--lg: 24px;
		--semi-bold--xxl: 32px;
		--regular--xs: 7px;
		--regular--md-small: 17px;
		--regular--md: 14px;
		--regular--sm: 9px;

		/* Effect styles */
		--list-item:  0px 4px 35px rgba(0, 0, 0, 0.15);

	}
`;

export default GlobalStyle;
