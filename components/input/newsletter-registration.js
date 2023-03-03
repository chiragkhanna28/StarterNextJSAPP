import classes from './newsletter-registration.module.css';
import {useRef,useContext} from 'react';
import NotificationContext from '@/store/notification-context';


function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationContext = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();
    notificationContext.showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter',
      status: 'pending'
    });
    const reqBody = { email: emailRef.current.value};
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok){
          return response.json();
        }
        return response.json().then((data)=>{
          throw new Error(data.message || 'Something went wrong');
        })
      })
      .then((data) => {
        console.log(data);
        notificationContext.showNotification({
          title: 'Success',
          message: 'Successfully Registered',
          status: 'success'
        });
      })
      .catch((error)=>{
        notificationContext.showNotification({
          title: 'Error',
          message: error.message,
          status: 'error'
        });
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
