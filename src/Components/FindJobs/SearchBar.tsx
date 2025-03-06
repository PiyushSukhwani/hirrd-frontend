import { Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../../Data/JobsData";
import { MultiInput } from "../UI/multi-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../Slices/FilterSlice";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([1, 300]);
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    dispatch(updateFilter({ ["Salary"]: event }));
  };

  return (
    <div className="flex px-5 py-8 items-center">
      {dropdownData.map((item, index) => (
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} key={index} />
          </div>
          <Divider size="xs" orientation="vertical" mr="xs" />
        </React.Fragment>
      ))}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          size={"xs"}
          color="brightSun.4"
          value={value}
          max={300}
          min={0}
          onChangeEnd={(e) => handleChange(e)}
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
