import { Control, Controller } from "react-hook-form";
import { Slider } from "@mui/material";
import { Section, SectionTitle, SliderContainer, RangeText } from "../styles";
import { FilterState } from "../../model/types";
import { RANGE_CONSTRAINTS } from "../../model/constants";

type RangeSectionProps = {
  control: Control<FilterState>;
  title: string;
  name: "priceRange" | "mileageRange" | "yearRange";
};

export const RangeSection = ({ control, title, name }: RangeSectionProps) => {
  const { min, max, step, format } = RANGE_CONSTRAINTS[name];
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <SliderContainer>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <Slider
                value={value}
                onChange={(_, newValue) =>
                  onChange(newValue as [number, number])
                }
                valueLabelDisplay="auto"
                valueLabelFormat={format}
                min={min}
                max={max}
                step={step}
              />
              <RangeText>
                {format(value[0])} - {format(value[1])}
              </RangeText>
            </>
          )}
        />
      </SliderContainer>
    </Section>
  );
};
