import { Divider, Input, RangeSlider } from "@mantine/core";
import { MultiInput } from "../UI/multi-input";
import React, { useState } from "react";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (name: any, event: any) => {
    if (name === "experience") {
      dispatch(updateFilter({ exp: event }));
    } else {
      setName(event.target.value);
      dispatch(updateFilter({ name: event.target.value }));
    }
  };
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
          <IconUserCircle />
        </div>
        <Input
          defaultValue={name}
          onChange={(e) => handleChange("name", e)}
          className="[&_input]:!placeholder-mine-shaft-300 mr-10"
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>
      {searchFields.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} key={index} />
          </div>
          <Divider size="xs" orientation="vertical" mr="xs" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Experiences (Years)</div>
          <div>
            {value[0]} - {value[1]}
          </div>
        </div>
        <RangeSlider
          size={"xs"}
          color="brightSun.4"
          max={50}
          min={0}
          value={value}
          onChangeEnd={(e) => handleChange("experience", e)}
          onChange={setValue}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          minRange={0}
        />
      </div>
    </div>
  );
};

export default SearchBar;
