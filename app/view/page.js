import { ExpensesView } from "./ExpensesView";
import { addQueryParams } from "../../redux/utils";
import { Suspense } from "react";

export default function View() {
  return (
    <div>
      <Suspense>
        <ExpensesView/>
      </Suspense>
    </div>
  );
}
