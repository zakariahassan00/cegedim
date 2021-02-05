import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Card, ListItemIcon, Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import format from "date-fns/format";

const TimeSlots = (props) => {
  const { items } = props;

  const formatRange = (from: string, to: string) => {
    return `${format(new Date(from), "MM/dd/yyyy HH:mm")} - ${format(
      new Date(to),
      "HH:mm"
    )}`;
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem>
          <Card>
            <ListItemIcon>
              <CalendarTodayIcon />
              <Typography>
                {formatRange(item.startDate, item.endDate)}
              </Typography>
            </ListItemIcon>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default TimeSlots;
