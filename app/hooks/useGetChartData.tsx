import { useState, useEffect } from "react";
import { OrderType } from "../types/client/item";
import { ExpenseType } from "../types/client/expense";
import { getEndOfWeek, getStartOfWeek } from "@/lib/utils";

type DataPoint = {
  xLabel: string;
  revenue: number;
  expenses: number;
};

function useGetChartData(paidOrders: OrderType[], expenses: ExpenseType[]) {
  const [allTimeData, setAllTimeData] = useState<DataPoint[]>([]);
  const [yearData, setYearData] = useState<DataPoint[]>([]);
  const [weekData, setWeekData] = useState<DataPoint[]>([]);

  function groupDataByAllTime() {
    const result: { [year: string]: DataPoint } = {};
    let maxYear = 0;

    for (const order of paidOrders) {
      const date = order.dateCreated.toDate();
      const year = date.getFullYear();

      if (year > maxYear) {
        maxYear = year;
      }

      if (!result[year.toString()]) {
        result[year.toString()] = {
          xLabel: year.toString(),
          revenue: 0,
          expenses: 0,
        };
      }
      result[year.toString()].revenue += order.price;
    }

    for (const expense of expenses) {
      const date = expense.date.toDate();
      const year = date.getFullYear();

      if (year > maxYear) {
        maxYear = year;
      }

      if (!result[year.toString()]) {
        result[year.toString()] = {
          xLabel: year.toString(),
          revenue: 0,
          expenses: 0,
        };
      }
      result[year.toString()].expenses += expense.amount;
    }

    let localAllTimeData = Object.values(result);

    while (localAllTimeData.length < 7) {
      maxYear += 1;
      localAllTimeData.push({
        xLabel: maxYear.toString(),
        revenue: 0,
        expenses: 0,
      });
    }

    console.log(localAllTimeData);

    setAllTimeData(localAllTimeData);
  }

  function groupDataByYear() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const result: { [month: string]: DataPoint } = {};

    months.forEach((month) => {
      result[month] = { xLabel: month, revenue: 0, expenses: 0 };
    });

    const currentYear = new Date().getFullYear();

    for (const order of paidOrders) {
      const date = order.dateCreated.toDate();
      if (date.getFullYear() != currentYear) {
        continue;
      }

      const month = date.toLocaleString("default", { month: "short" });
      if (!result[month]) {
        result[month] = { xLabel: month, revenue: 0, expenses: 0 };
      }
      result[month].revenue += order.price;
    }

    for (const expense of expenses) {
      const date = expense.date.toDate();
      if (date.getFullYear() != currentYear) {
        continue;
      }

      const month = date.toLocaleString("default", { month: "short" });
      if (!result[month]) {
        result[month] = { xLabel: month, revenue: 0, expenses: 0 };
      }
      result[month].expenses += expense.amount;
    }

    setYearData(Object.values(result));
  }

  function groupDataByWeek() {
    const startOfWeek = getStartOfWeek(new Date());
    const endOfWeek = getEndOfWeek(startOfWeek);

    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekResult: { [day: string]: DataPoint } = {};

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      const dayLabel = dayLabels[currentDay.getDay()];
      weekResult[dayLabel] = { xLabel: dayLabel, revenue: 0, expenses: 0 };
    }

    paidOrders.forEach((order) => {
      const date = order.dateCreated.toDate();
      if (date >= startOfWeek && date <= endOfWeek) {
        const dayLabel = dayLabels[date.getDay()];
        weekResult[dayLabel].revenue += order.price;
      }
    });

    expenses.forEach((expense) => {
      const date = expense.date.toDate();
      if (date >= startOfWeek && date <= endOfWeek) {
        const dayLabel = dayLabels[date.getDay()];
        weekResult[dayLabel].expenses += expense.amount;
      }
    });

    setWeekData(Object.values(weekResult));
  }

  useEffect(() => {
    groupDataByAllTime();
    groupDataByYear();
    groupDataByWeek();
  }, [paidOrders, expenses]);

  return { allTimeData, yearData, weekData };
}

export default useGetChartData;
