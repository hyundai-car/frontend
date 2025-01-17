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
  const marks = createMarks(min, max, step, format);
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
                sx={{
                  color: "#5662F6", // MUI의 기본 primary color
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#5662F6",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#5662F6",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#5662F6",
                  },
                  "& .MuiSlider-markLabel": {
                    fontSize: "11px",
                  },
                }}
                value={value}
                onChange={(_, newValue) =>
                  onChange(newValue as [number, number])
                }
                valueLabelDisplay="auto"
                valueLabelFormat={format}
                min={min}
                max={max}
                step={step}
                marks={marks}
              />
              {/* <RangeText>
                {format(value[0])} - {format(value[1])}
              </RangeText> */}
            </>
          )}
        />
      </SliderContainer>
    </Section>
  );
};

const createMarks = (
  min: number,
  max: number,
  step: number,
  format: (value: number) => string
) => {
  // step 값에 맞춰 값을 조정하는 함수
  const adjustToStep = (value: number) => {
    const steps = Math.round((value - min) / step);
    return min + steps * step;
  };

  const range = max - min;
  const quarter = range / 4;

  // 각 값을 step에 맞게 조정
  const secondQuarterValue = adjustToStep(min + quarter * 1);
  const middleValue = adjustToStep(min + quarter * 2);

  return [
    { value: min, label: format(min) },
    { value: secondQuarterValue, label: format(secondQuarterValue) },
    { value: middleValue, label: format(middleValue) },
    { value: max, label: format(max) },
  ];
};
