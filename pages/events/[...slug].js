import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getFilteredEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import { Fragment } from "react";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/events/ErrorAlert";
import useSWR from "swr";
import Head from "next/head";

function FilteredEventsPage(props) {
  console.log(props);
  const { filterEvents, selectedDate } = props;
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  const [loadedEvents, SetLoadedEvents] = useState(props.filterEvents);

  const { data, error } = useSWR(
    "https://nextjslearning-b2dd9-default-rtdb.firebaseio.com/events.json",
    (apiURL) => fetch(apiURL).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      console.log("inside use effect");
      const transFormedEvents = [];
      for (const key in data) {
        transFormedEvents.push({
          id: key,
          ...data[key],
        });
      }
      SetLoadedEvents(transFormedEvents);
    }
  }, [data]);

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  console.log(filteredYear);
  console.log(filteredMonth);

  const PageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${filteredYear} ${filteredMonth}`}
      />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {PageHeadData}
        <p className="center">Loading!!!</p>
      </Fragment>
    );
  }

  const filteredEventsNew = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });
  // if (isNaN(filteredYear) || isNaN(filteredMonth)) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>Invalid Filter. Please adjust your values</ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const filteredEvents = getFilteredEvents({
  //   year: filteredYear,
  //   month: filteredMonth,
  // });

  if (isNaN(filteredYear) || isNaN(filteredMonth)) {
    return (
      <Fragment>
        {PageHeadData}
        <ErrorAlert>Invalid Filter. Please adjust your values</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEventsNew || filteredEventsNew.length === 0) {
    return (
      <Fragment>
        {PageHeadData}
        <ErrorAlert>No Events found for this filter</ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(selectedDate.year, selectedDate.month - 1);
  return (
    <Fragment>
      {PageHeadData}
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEventsNew}></EventList>
    </Fragment>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const filterData = context.params.slug;

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  console.log(filteredYear);
  console.log(filteredMonth);
  // if (isNaN(filteredYear) || isNaN(filteredMonth)) {
  //   return {
  //     props: {
  //       hasError: true,
  //     },
  //   };
  // }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      filterEvents: filteredEvents,
      selectedDate: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
}
