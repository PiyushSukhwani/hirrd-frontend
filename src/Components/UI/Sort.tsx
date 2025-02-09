import { useState } from "react";
import {
  Button,
  Combobox,
  useCombobox,
  Text,
  Box,
  ActionIcon,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

const opt = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

function Sort() {
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option value={item} key={item} className="text-xs">
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={150}
      position="bottom-start"
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {/* <Button onClick={() => combobox.toggleDropdown()}>Pick item</Button> */}
        <div
          onClick={() => combobox.toggleDropdown()}
          className="border gap-2 text-sm border-bright-sun-400 flex items-center px-2 py-1 rounded-xl cursor-pointer"
        >
          {selectedItem}
          <ActionIcon
            color="brightSun.4"
            variant="transparent"
            aria-label="Setting"
          >
            <IconAdjustments style={{width:"70%", height:"70%"}} stroke={1.5} />
          </ActionIcon>
        </div>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default Sort;
