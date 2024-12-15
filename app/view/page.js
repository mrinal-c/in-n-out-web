import { ExpensesView } from "../components/ExpensesView";
import { addQueryParams } from "../../redux/utils";
import { Suspense } from "react";

export default function View() {
  return (
    <div>
      <ExpensesView />
    </div>
  );
}
