import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Card, ListItemIcon, Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { formatDateRange } from "../utils/date";

const TimeSlots = (props) => {
  const { items } = props;
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Card>
            <ListItemIcon>
              <CalendarTodayIcon />
              <Typography>
                {formatDateRange({
                  from: new Date(item.startDate),
                  to: new Date(item.endDate),
                })}
              </Typography>
            </ListItemIcon>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default TimeSlots;
