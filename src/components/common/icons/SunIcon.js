import { IconContext } from "react-icons";
import { CgSun } from "react-icons/cg";

const SunIcon = ({ size, color }) => {
	return (
		<IconContext.Provider value={{ size: size, color: color }}>
			<CgSun />
		</IconContext.Provider>
	);
};

export default SunIcon;
