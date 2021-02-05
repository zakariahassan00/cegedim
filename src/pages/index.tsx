import { Link, makeStyles } from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles({
  home: {
    display: "flex",
    flexDirection: "column",
    height: "100%",

    "& > section": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <section>
        <header>Time slots</header>
        <NextLink href="/timeslots">
          <Link>Let's take a look at the time slots page</Link>
        </NextLink>
      </section>
      <section>
        <header>Appointments</header>
        <NextLink href="/appointments">
          <Link>Let's work on appointments</Link>
        </NextLink>
      </section>
    </div>
  );
};

Home.pageTitle = "Test technique Maiia";

export default Home;
