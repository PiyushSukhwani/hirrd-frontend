import { useEffect, useState } from "react";
import { Combobox, InputBase, ScrollArea, useCombobox } from "@mantine/core";

export function SelectInput(props: any) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState<string[]>([]);
  const [search, setSearch] = useState(
    props.form.getValues()[props.name] || ""
  );
  const [value, setValue] = useState(props.form.getValues()[props.name] || "");

  useEffect(() => {
    setData(props.options);
    setValue(props.form.getValues()[props.name] || "");
    setSearch(props.form.getValues()[props.name] || "");
  }, []);

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data?.filter((item) =>
        item.toLowerCase().includes(search?.toLowerCase().trim())
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          setData((current) => [...current, search]);
          setValue(search || ""); // Ensure it's never undefined
          props.form.setFieldValue(props.name, search || "");
        } else {
          setValue(val || ""); // Ensure it's never undefined
          setSearch(val || ""); // Ensure it's never undefined
          props.form.setFieldValue(props.name, val || "");
        }

        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          withAsterisk
          label={props.label}
          leftSection={<props.leftSection stroke={1.5} />}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value || "");
          }}
          placeholder={props.placeholder}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
            {options}
            {!exactOptionMatch && search?.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
