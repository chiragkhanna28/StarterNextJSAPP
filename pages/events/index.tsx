import { GetAllEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList";
function EventsPage(props:any) {
  const allEvents =  props.allEvents;
  return (
    <div>
      <EventList items={allEvents}></EventList>
    </div>
  );
}

export default EventsPage;

export async function getStaticProps(context: any) {
  const allEvents = await GetAllEvents();
  return {
    props:{
      allEvents: allEvents
    },
    revalidate: 600
  }
}
