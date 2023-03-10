import Button from '../ui/Button';
import classes from './ResultsTitle.module.css';

function ResultsTitle(props: any) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
    </section>
  );
}

export default ResultsTitle;
