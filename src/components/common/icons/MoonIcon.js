import { IconContext } from "react-icons";
import { CgMoon } from "react-icons/cg";

const MoonIcon = ({ size, color }) => {
	return (
		<IconContext.Provider value={{ size: size, color: color }}>
			<CgMoon />
		</IconContext.Provider>
	);
};

export default MoonIcon;
