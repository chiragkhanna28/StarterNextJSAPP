export async function GetAllEvents() {
  return fetch("https://nextjslearning-b2dd9-default-rtdb.firebaseio.com/events.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transFormedEvents = [];
      for (const key in data) {
        transFormedEvents.push({
          id: key,
          ...data[key]
        });
      }
      return transFormedEvents;
    });
}

export async function getFeaturedEvents() {
  const events = await GetAllEvents();
  return events.filter((event:any) => {
    return event.isFeatured;
  });
}

export async function getEventById(id: any) {
    const events = await GetAllEvents();
    return events.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: any) {
    const events = await GetAllEvents();
    const { year, month } = dateFilter;
  
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
    console.log(filteredEvents);
    return filteredEvents;
  }