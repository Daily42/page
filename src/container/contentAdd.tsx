/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable quote-props */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { DARK, LIGHT } from "../theme/theme";
import Props from "../interface/props.interface";
import "react-multi-date-picker/styles/layouts/mobile.css";
import placeType from "../enum/placeType.enum";
import Idate, { IDateObject} from "../interface/date.interface";
import Ipost from "../interface/post.interface";
import PlaceType from "../enum/placeType.enum";


const Contents = styled.div<Props>`
  height: calc(100% - 50px);
  width: 70%;
  margin-left: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
  padding: 3vh;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
  height: 100vh;
`;

const Card = styled.div<Props>`
  background-color: ${(props) => (props.darkMode ? DARK.BACKGROUND : LIGHT.BACKGROUND)};
  border-radius: 8px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  padding: 32px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input<Props>`
  background-color: ${(props) => (props.darkMode ? LIGHT.FORM : LIGHT.FORM)};
  border: none;
  border-radius: 8px;
  color: ${(props) => (props.darkMode ? DARK.TEXT : LIGHT.TEXT)};
  padding: 16px;
  font-size: 16px;
`;

const TextArea = styled.textarea<Props>`
  background-color: ${(props) => (props.darkMode ? DARK.FORM : LIGHT.FORM)};
  border: none;
  border-radius: 8px;
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
  background-color: ${(props) => (props.darkMode ? DARK.FORM : LIGHT.FORM)};
  border: none;
  border-radius: 8px;
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
  }
) {
  const { darkMode } = props;
  const initialFormData: Ipost = {
    title: "",
    typeId: "1",
    context: "",
    locationCode: PlaceType.PL0000,
    locationName: "",
    dates: [],
  };

  const [formData, setFormData] = useState<Ipost>(initialFormData);

  const [selectDate, setSelectDate] = useState<{
    date: IDateObject[];
    term: string;
  }>({
    date: [],
    term: "",
  });
  const [isRange, setIsRange] = useState(false);
  const [selectedOption, setSelectedOption] = useState("42seoul_official");
  const [selectedOption2, setSelectedOption2] = useState("개포 클러스터");
  const [showLocationInputgaepo, setshowLocationInputgaepo] = useState(true);

  // useEffect(() => {
  //   if (selectDate.date.length > 0) {
  //     if (isRange) {
  //       const start = selectDate.date[0];
  //       const end = selectDate.date[1];
  //       let currentDate = new Date(start.year, start.month - 1, start.day + 1, start.hour, start.minute);
  //       const endDate = new Date(end.year, end.month - 1, end.day + 1, end.hour, end.minute);
  //       while (currentDate <= endDate) {
  //         console.log(currentDate.toISOString());
  //         currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
  //       }
  //     } else {
  //       selectDate.date.map(date => {
  //         const { year, month, day, hour, minute } = date;
  //         const isoDate = new Date(year, month - 1, day + 1, hour, minute).toISOString();
  //         console.log(isoDate);
  //       });
  //     }
  //   } else {
  //     console.log("No date selected");
  //   }
  //   console.log(selectDate);
  // }, [selectDate.date, isRange]);

  const options = [
    "42seoul_official",
    "study group",
    "club(동아리)",
    "hackerthon & conference",
    "etc"
  ];

  const eventTypeMap: { [key: string]: string } = {
    "42seoul_official": "1",
    "study group": "2",
    "club(동아리)": "3",
    "hackerthon & conference": "4",
    "etc": "5",
  };

  const options2 = [
    "개포 클러스터",
    "서초 클러스터",
    "기타",
    "개포 클러스터 - 2층 Cluster 01",
    "개포 클러스터 - 2층 Cluster 02",
    "개포 클러스터 - 4층 Cluster 03",
    "개포 클러스터 - 4층 Cluster 04",
    "개포 클러스터 - 5층 Cluster 05",
    "개포 클러스터 - 5층 Cluster 06",
    "서초 클러스터 - 4층 Cluster 07",
    "서초 클러스터 - 4층 Cluster 08",
    "서초 클러스터 - 5층 Cluster 09",
    "서초 클러스터 - 5층 Cluster 10",
    "개포 클러스터 - 3층 ClusterX 01",
    "개포 클러스터 - 3층 ClusterX 02",
    "개포 클러스터 - 1층 오픈클러스터",
    "개포 클러스터 - 1층 게임장",
    "개포 클러스터 - 1층 42Lab",
  ];

  const placeTypeMap: { [key: string] : PlaceType } = {
    "개포 클러스터": placeType.PL0000,
    "서초 클러스터": placeType.PL0100,
    "기타 etc": placeType.PL0200,
    "개포 클러스터 - 2층 Cluster 01": placeType.PL0001,
    "개포 클러스터 - 2층 Cluster 02": placeType.PL0002,
    "개포 클러스터 - 4층 Cluster 03": placeType.PL0003,
    "개포 클러스터 - 4층 Cluster 04": placeType.PL0004,
    "개포 클러스터 - 5층 Cluster 05": placeType.PL0005,
    "개포 클러스터 - 5층 Cluster 06": placeType.PL0006,
    "서초 클러스터 - 4층 Cluster 07": placeType.PL0007,
    "서초 클러스터 - 4층 Cluster 08": placeType.PL0008,
    "서초 클러스터 - 5층 Cluster 09": placeType.PL0009,
    "서초 클러스터 - 5층 Cluster 10": placeType.PL0010,
    "개포 클러스터 - 3층 ClusterX 01": placeType.PL0011,
    "개포 클러스터 - 3층 ClusterX 02": placeType.PL0012,
    "개포 클러스터 - 1층 오픈클러스터": placeType.PL0013,
    "개포 클러스터 - 1층 게임장": placeType.PL0014,
    "개포 클러스터 - 1층 42Lab": placeType.PL0015,
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOptionChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      typeId: eventTypeMap[selectedValue],
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
    setSelectedOption2(value);
    if (value === "기타" || value === "개포 클러스터" || value === "서초 클러스터") {
      setshowLocationInputgaepo(true);
    } else {
      setshowLocationInputgaepo(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        locationName: "",
      }));
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationCode: placeTypeMap[value],
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
  };

  return (
    <Container darkMode={darkMode}>
      <Card darkMode={darkMode}>
        <Heading darkMode={darkMode}>새로운 글 작성</Heading>
        <Form onSubmit={handleSubmit}>
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
              height: "26px"
            }}
            containerStyle={{
              width: "100%"
            }}
            darkMode={darkMode}
            className="rmdp-mobile"
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
            mobileButtons={[
              {
                label: "RESET",
                className: "rmdp-button rmdp-action-button",
                onClick: () => {
                  setSelectDate((prevFormData) => ({
                    ...prevFormData,
                    date: [],
                  }));
                },
              }
            ]}
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
          <Dropdown value={selectedOption} onChange={handleOptionChangeEvent}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Dropdown>
          <Dropdown value={selectedOption2} onChange={handleOption2Change}>
            {options2.map((option) => (
              <option key={option} value={option}>
                {option}
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
          <SubmitButton type="submit">Post</SubmitButton>
        </Form>
      </Card>
    </Container>
  );
}

export default WritePost;

export function ContainerContents(
  props: {
    darkMode: boolean,
    toggleDarkMode: Function
  }
) {
  const { darkMode, toggleDarkMode } = props;
  return (
    <Contents className="contents" darkMode={darkMode}>
      <div>
        <WritePost darkMode={darkMode} />
      </div>
    </Contents>
  );
}
