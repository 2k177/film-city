export default function AppTitle(props) {
  const {
    title = 'Film city',
    subtitle = 'Are you looking for a movie or an actor?',
  } = props;

  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}