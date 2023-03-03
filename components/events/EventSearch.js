import Button from "../ui/Button";
import classes from "./EventSearch.module.css";
import { useRef } from "react";
function EventSearch(props) {
  const yearRef = useRef();
  const monthRef = useRef();
  function submitHandler(event) {
    event.preventDefault();
    const selectedYear = yearRef && yearRef.current? yearRef.current.value:'1991';
    const selectedMonth = monthRef && monthRef.current? monthRef.current.value:'0';
    props.OnSearch(selectedYear, selectedMonth);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}
export default EventSearch;
