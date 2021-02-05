import Link from "next/link";
import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  back: {
    gridArea: "back",
    color: "white",
    margin: "auto",
  },
  backLabel: { color: "white" },
  title: { gridArea: "title", color: "white" },
  subtitle: { gridArea: "subtitle", color: "lightgray" },
});

type Props = {
  title: string;
  subtitle?: string;
};

export const Header = (props: Props) => {
  const { title, subtitle } = props;
  const { pathname } = useRouter();
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <IconButton
            classes={{ label: classes.backLabel }}
            disabled={pathname === "/"}
          >
            M
          </IconButton>
        </Link>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h6" className={classes.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
