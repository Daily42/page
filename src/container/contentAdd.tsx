/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable quote-props */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DARK, LIGHT } from "../theme/theme";
import Props from "../interface/props.interface";
import "react-multi-date-picker/styles/layouts/mobile.css";
import placeType from "../enum/placeType.enum";
import Idate, { IDateObject } from "../interface/date.interface";
import Ievent from "../interface/event.interface";
import Ipost from "../interface/post.interface";
import PlaceType from "../enum/placeType.enum";
import Ilocation from "../interface/location.interface";
import Itype from "../interface/type.interface";
import { writePost } from "../network/api/axios.custom";

const Contents = styled.div<Props>`
  width: 100vw;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: none;
    width: 0.6rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
    width: 0.4rem;
    right: 60px;
  }
`;

const Container = styled.div<Props>`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input<Props>`
  background-color: white;
  border: none;
  border-radius: 3px;
  color: black;
  padding: 16px;
  font-size: 16px;
`;

const TextArea = styled.textarea<Props>`
  background-color: ${(props) => (props.darkMode ? DARK.FORM : LIGHT.FORM)};
  border: none;
  border-radius: 3px;
  color: #333;
  min-height: 200px;
  padding: 16px;
  font-size: 16px;
`;

const SubmitButton = styled.button<Props>`
  background-color: #0070F3;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0060D6;
  }
`;

const DatePickerInput = styled(DatePicker)<Props>`
  background-color: ${(props) => (props.darkMode ? DARK.FORM : LIGHT.FORM)};
  border: none;
  border-radius: 8px;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  padding: 16px;
  font-size: 16px;
`;

const Heading = styled.h1<Props>`
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const Dropdown = styled.select<Props>`
  border: none;
  border-radius: 3px;
  color: #333;
  padding: 16px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
`;

const CheckboxInput = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxText = styled.span`
  font-size: 16px;
  margin-left: 8px;
`;

function WritePost(
  props: {
    darkMode: boolean,
    locations: Ilocation[]
    types: Itype[]
  }
) {
  const { darkMode, locations, types } = props;
  const navigate = useNavigate();
  function navigateTo(id: string) {
    navigate("/search");
  }
  const initialFormData: Ipost = {
    title: "",
    typeId: "1",
    context: "",
    locationCode: placeType.PL0000,
    locationName: "",
    dates: [],
  };

  let mode = "default";
  if (darkMode === true) {
    mode = "dark";
  } else {
    mode = "default";
  }

  const [formData, setFormData] = useState<Ipost>(initialFormData);

  const [selectDate, setSelectDate] = useState<{
    date: IDateObject[];
    term: string;
  }>({
    date: [],
    term: "",
  });
  const [isRange, setIsRange] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Itype>(types[0]);
  const [selectedOption2, setSelectedOption2] = useState<Ilocation>(locations[0]);
  const [showLocationInputgaepo, setshowLocationInputgaepo] = useState(true);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOptionChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: Itype = types.find((x: any) => x?.id.toString() === event.target.value)!;
    setSelectedOption(selectedValue);
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      typeId: selectedValue.id,
    }));
  };

  const handleInputChangeTerm = (event: any) => {
    const { name, value } = event.target;
    const onlyNumber = value.replace(/[^0-9]/g, "")
    setSelectDate((prevFormData: any) => ({
      ...prevFormData,
      [name]: onlyNumber,
    }));
  };

  const handleOption2Change = (event: any) => {
    const { value } = event.target;
    const selectedLocation: Ilocation = locations.find((x) => x.code === event.target.value)!;
    console.log(typeof (value), selectedLocation);
    setSelectedOption2(selectedLocation);
    if (selectedLocation.code === locations[0].code ||
      selectedLocation.code === locations[1].code ||
      selectedLocation.code === locations[2].code) {
      setshowLocationInputgaepo(true);
    } else {
      setshowLocationInputgaepo(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        dates: formData.dates,
      }));
    }
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      locationCode: selectedLocation.code,
    }));
  };

  const handleCheckboxChange = () => {
    setIsRange(!isRange);
    selectDate.date = [];
    formData.dates = [];
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isRange) {
      const start = selectDate.date[0];
      const end = selectDate.date[1];
      let currentDate = new Date(start?.year, start?.month - 1, start?.day + 1, start?.hour, start?.minute);
      const endDate = new Date(end?.year, end?.month - 1, end?.day + 1, end?.hour, end?.minute);
      while (currentDate <= endDate) {
        formData.dates!.push({
          startAt: currentDate.toISOString(),
          term: parseInt(selectDate.term, 10),
        });
        currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
      }
    } else {
      formData.dates = selectDate.date.map((date) => {
        const { year, month, day, hour, minute } = date;
        const isoDate = new Date(year, month - 1, day + 1, hour, minute).toISOString();
        return {
          startAt: isoDate,
          term: parseInt(selectDate.term, 10),
        };
      });
    }
    writePost(formData).then((response) => {
      console.log(response);
      alert("글 작성에 성공했습니다.");
      navigateTo("0");
    });
  };

  return (
    <Container darkMode={darkMode}>
      <Heading darkMode={darkMode}>새로운 글 작성</Heading>
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Input
          type="text"
          name="title"
          placeholder="제목"
          value={formData.title}
          maxLength={100}
          darkMode={darkMode}
          onChange={handleInputChange}
        />
        <TextArea
          name="context"
          placeholder="글 작성"
          value={formData.context}
          onChange={handleInputChange}
        />
        <DatePickerInput
          style={{
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "3px",
            height: "50px",
            fontSize: "16px",
            paddingLeft: "14px",
          }}
          containerStyle={{
            width: "100%"
          }}
          darkMode={darkMode}
          className={`rmdp-mobile bg-${mode} ${darkMode ? "default" : "default"}`}
          multiple={!isRange}
          range={isRange}
          name="date"
          placeholder="시작날짜 및 시각"
          format="MM/DD/YYYY HH:mm:ss"
          plugins={[
            <TimePicker position="bottom" />,
            <DatePanel markFocused />
          ]}
          value={selectDate.date.map(
            ({ year, month, day, hour, minute }) =>
              new Date(year, month - 1, day, hour, minute).toLocaleString("en-US", {
                timeZone: "UTC",
              })
          )}
          onChange={(value: any) =>
            setSelectDate((prevFormData) => ({
              ...prevFormData,
              date: value,
            }))
          }
        />
        <CheckboxLabel>
          <CheckboxInput type="checkbox" onChange={handleCheckboxChange} />
          <CheckboxText>Range mode</CheckboxText>
        </CheckboxLabel>
        <Input
          type="term"
          name="term"
          placeholder="기간(분)"
          maxLength={20}
          value={selectDate.term}
          onChange={handleInputChangeTerm}
        />
        <Dropdown value={selectedOption?.id} onChange={handleOptionChangeEvent}>
          {types.map((type: Itype) => (
            <option key={type.id} value={type.id}>
              {type.title}
            </option>
          ))}
        </Dropdown>
        <Dropdown value={selectedOption2?.code} onChange={handleOption2Change}>
          {locations.map((location: Ilocation) => (
            <option key={location.code} value={location.code}>
              {location.title}
            </option>
          ))}
        </Dropdown>
        {showLocationInputgaepo && (
          <Input
            type="text"
            name="locationName"
            placeholder="장소"
            maxLength={100}
            value={formData.locationName}
            onChange={handleInputChange}
          />
        )}
        <SubmitButton type="submit">제출</SubmitButton>
      </Form>
    </Container>
  );
}

export default WritePost;

export function ContainerContents(
  props: {
    darkMode: boolean,
    locations: Ilocation[],
    types: Itype[]
  }
) {
  const { darkMode, locations, types } = props;
  return (
    <Contents className="contents" darkMode={darkMode}>
      <WritePost
        darkMode={darkMode}
        locations={locations}
        types={types}
      />
    </Contents>
  );
}
