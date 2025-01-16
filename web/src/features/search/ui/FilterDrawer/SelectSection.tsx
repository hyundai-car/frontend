import { Control, Controller } from "react-hook-form";
import { Section, SectionTitle, ButtonGroup, FilterButton } from "../styles";
import { FilterState } from "../../model/types";

type SelectSectionProps = {
  control: Control<FilterState>;
  title: string;
  name: "fuel" | "bodyType";
  options: readonly string[];
};

export const SelectSection = ({
  control,
  title,
  name,
  options,
}: SelectSectionProps) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
      }: {
        field: { value: string[]; onChange: (value: string[]) => void };
      }) => (
        <ButtonGroup>
          {options.map((option) => (
            <FilterButton
              type="button"
              key={option}
              $selected={value.includes(option)}
              onClick={() => {
                const newValue = value.includes(option)
                  ? value.filter((item) => item !== option)
                  : [...value, option];
                onChange(newValue);
              }}
            >
              {option}
            </FilterButton>
          ))}
        </ButtonGroup>
      )}
    />
  </Section>
);
