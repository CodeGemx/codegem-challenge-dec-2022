/* 
Implementing this with something like react calendar should be fairly fast 
Todo:
Clicking on a day in the calendar should filter the list of check-ins by that day
*/

import styled from "@emotion/styled";
import React from "react";
import { useState } from 'react';

const CalendarContainer = styled.div`
  max-width: max-content;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArrowLeft = styled.div`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #717C99;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
`;

const ArrowRight = styled.div`
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #717C99;
  transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
`;

const MonthIndicator = styled.div`
  font-weight: 400;
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color: #717C99;
`;

const DayOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 1.25em;
  justify-content: center;
  align-items: center;
`;

const DayName = styled.div`
  width: 38.21px;
  margin-left: 2px;
  margin-right: ${props => props.day == 'Fri' ? '15px' : '2px'};
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  &:first-of-type {
    grid-column: 6;
  }
`;

const GridDaySection = styled.div`
  width: 38.21px;
  height: 38.21px;
  margin: 2px;
  margin-right: ${props => props.day == 'Fri' ? '15px' : '2px'};
  background: ${props => props.bg};
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.2);
  border-radius: 6.86px 6.86px 6.86px 4.5px;
  z-index: 999;
`;

const GridDay = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.22px;
  color: #CBD5F7;
  height: 34.21px;
`;

const IndicatorSection = styled.div`
  display: flex;
  align-items: start;
  top: -5px;
  position: relative;
  left: 2px;
`;

const Indicator = styled.span`
  box-sizing: border-box;
  width: 6px;
  height: 6px;
  background:  ${props => props.bg};
  border: 0.05px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.2);
  margin-right: 1px;
  border-radius: 3px;
`;

const DaysGrid = styled.div`
  position: relative;
  height: 240px;
`;

const WeekendBg = styled.div`
  height: 240px;
  background: rgba(245, 248, 255, 0.5);
  border: 0.5px solid #F1F4FB;
  border-radius: 6.86px;
  width: 95px;
  right: -2px;
  top: -5px;
  position: absolute;
`;

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getPreDay(date) {
  const day = date.getDay();
  const pos = dayNames.indexOf(dayNames[day]) + 1;
  const empty = 7 - pos;
  var days = [];
  for (let d = 1; d <= empty; d++) {
    days.push({
      date: "E",
      day: "1",
      dayName: "Empty",
      moods: getIndicatorData()
    });
  }
  return days;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getBg() {
  return [
    "linear-gradient(180deg, #FFEB9C 0%, #FFC74A 100%)",
    "linear-gradient(180deg, #FE7690 0%, #DC3047 100%)",
    "linear-gradient(180deg, #6ADAA0 0%, #2DA467 100%)",
    "linear-gradient(180deg, #8BF7D1 0%, #46C895 100%)",
    "#F5F8FF"
  ];
}

function getIndicatorData() {
  return [
    getBg()[getRandomInt(3)],
    getBg()[getRandomInt(3)],
    getBg()[getRandomInt(3)],
  ];
}

function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = getPreDay(date);
  while (date.getMonth() === month) {
    const day = date.getDay();
    days.push({
      date: date.getDate(),
      day: day,
      dayName: dayNames[day],
      moods: getIndicatorData()
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  const days = getDaysInMonth(1, 2023);
  return (
    <CalendarContainer>
      <CalendarHeader>
        <ArrowLeft></ArrowLeft>
        <MonthIndicator>
          May 2019
        </MonthIndicator>
        <ArrowRight></ArrowRight>
      </CalendarHeader>
      <DaysGrid>
        <WeekendBg></WeekendBg>
        <DayOfWeek>
          {dayNames.map((name, index) => (
            <DayName key={index} day={name}>
              {name}
            </DayName>
          ))}
        </DayOfWeek>
        <DateGrid>
          {days.map((date, index) => (
            <GridDaySection day={date.dayName} bg={ getBg()[getRandomInt(5)] }>
              <GridDay key={index}>
                {date.date}
              </GridDay>
              <IndicatorSection>
                {date.moods.map((mood, index) => (
                  <Indicator  key={index} bg={mood} />
                ))}
              </IndicatorSection>
            </GridDaySection>
          ))}
        </DateGrid>
      </DaysGrid>
    </CalendarContainer>
  );
}

export const CalendarCard = CalendarComponent;


