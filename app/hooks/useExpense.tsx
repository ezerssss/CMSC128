import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import clientDb from "../firebase/clientDB";
import useShopID from "../store";
import { ExpenseType } from "../types/client/expense";
import { ExpenseTypeEnum } from "../enums/expense";

function useExpense() {
  const { shopID } = useShopID();

  const [categoryBreakdown, setCategoryBreakdown] = useState({
    supplies: 0,
    labor: 0,
    utilities: 0,
  });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useEffect(() => {
    if (!shopID) {
      return;
    }

    const expensesCollectionRef = collection(
      clientDb,
      "shops",
      shopID,
      "expenses"
    );

    const expensesQuery = query(expensesCollectionRef, orderBy("date", "desc"));

    const unsub = onSnapshot(expensesQuery, (snapshot) => {
      const updatedOrders: ExpenseType[] = [];
      let totalExpensesLocal = 0;
      let categoryBreakdownLocal = {
        supplies: 0,
        labor: 0,
        utilities: 0,
      };

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as ExpenseType;
        updatedOrders.push(data);
        totalExpensesLocal += data.amount;

        if (data.category === ExpenseTypeEnum.LABOR) {
          categoryBreakdownLocal.labor += data.amount;
        } else if (data.category === ExpenseTypeEnum.SUPPLIES) {
          categoryBreakdownLocal.supplies += data.amount;
        } else if (data.category === ExpenseTypeEnum.UTILITIES) {
          categoryBreakdownLocal.utilities += data.amount;
        }
      });

      setExpenses(updatedOrders);
      setTotalExpenses(totalExpensesLocal);
      setCategoryBreakdown(categoryBreakdownLocal);
    });

    return () => unsub();
  }, [shopID]);

  return { expenses, totalExpenses, categoryBreakdown };
}

export default useExpense;
