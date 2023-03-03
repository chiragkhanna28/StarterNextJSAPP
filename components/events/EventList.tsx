import EventItem from "./EventItem";
import classes from "./EventList.module.css";

function EventList(props: any) {
  const { items } = props;
  console.log(items);
  return (
    <ul className={classes.list}>
      {items.map((event: any) => {
        return <EventItem key={event.id} id={event.id} title={event.title} image={event.image} date={event.date} location={event.location}></EventItem>;
      })}  
    </ul>
  );
}

export default EventList;
