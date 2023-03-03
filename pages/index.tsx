import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { getFeaturedEvents } from "@/helpers/api-util";
import { Fragment } from "react";
import { useRouter } from "next/router";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function Home(props:any) {
  
  const router = useRouter();
  function EventSearchHandler(selectedYear: any, selectedMonth: any) {
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  }
  return (
    <Fragment>
      <Head>
        <title>Next js Featured Events Page</title>
        <meta name="description" content="Find a lot of great events"/>
      </Head>
      <EventSearch OnSearch={EventSearchHandler}></EventSearch>
      <NewsletterRegistration></NewsletterRegistration>
      <EventList items={props.featuredEvents}></EventList>
    </Fragment>
  );
}

export async function getStaticProps(context: any) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props:{
      featuredEvents: featuredEvents
    },
    revalidate: 600
  }
}