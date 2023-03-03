import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { Fragment } from "react";
import EventSummary from "@/components/eventsdetail/event-summary";
import EventLogistics from "@/components/eventsdetail/event-logistics";
import EventContent from "@/components/eventsdetail/event-content";
import Head from "next/head";
import ErrorAlert from "@/components/events/ErrorAlert";
import Comments from "@/components/input/comments";

function EventDetailPage(props: any) {
  // const router = useRouter();
  // console.log(router.query.eventId);
  // const eventId =  router.query.eventId;
  //const event = getEventById(eventId);
  console.log(props);
  if(!props.selectedEvent){
    return <p>No Event</p>
  }
  const event = props.selectedEvent;
  if (!event) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content="Find a lot of great events"/>
      </Head>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      ></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventID={event.id}></Comments>
    </Fragment>
  );
}
export default EventDetailPage;

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const eventIDWithParams = allEvents.map((event: any) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });
  return {
    paths: eventIDWithParams,
    fallback: true,
  };
}
export async function getStaticProps(context: any) {
  const eventID = context.params.eventId;
  const event = await getEventById(eventID);
  if(!event){
    return {
      props:{
        selectedEvent: null
      },
      notFound: true
    }
  }
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 600
  };
}
