import { Divider, Input, RangeSlider } from "@mantine/core";
import { MultiInput } from "../UI/multi-input";
import React, { useState } from "react";
import { searchFields } from "../../Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([1, 100]);
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
          <IconUserCircle size={20} />
        </div>
        <Input className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />
      </div>
      {searchFields.map((item, index) => (
         <React.Fragment key={index}>
         <div className="w-1/5">
           <MultiInput optionsData={item} />
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
          onChange={setValue}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
