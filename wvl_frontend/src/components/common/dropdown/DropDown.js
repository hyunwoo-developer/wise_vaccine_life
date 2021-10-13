import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function DropDown({
    options,
    defaultOption,
    onChangeDropDown,
    myPlaceholder,
    ...rest
}) {
    return (
        <Dropdown
            options={options}
            onChange={onChangeDropDown}
            value={defaultOption}
            placeholder={myPlaceholder}
            controlClassName="DropDown_Control"
            menuClassName="DropDown_Menu"
            arrowClassName="DropDown_Arrow"
            {...rest}
        />
    );
}

export default DropDown;
