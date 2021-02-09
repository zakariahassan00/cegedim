import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Card, ListItemIcon, Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { formatDateRange } from "../utils/date";

const getTimeSlotDatacy = (id: string) => `timeslot-${id}`;

const TimeSlots = (props) => {
  const { items } = props;
  return (
    <List datacy="timeslot-list">
      {items.map((item) => (
        <ListItem key={item.id} datacy={getTimeSlotDatacy(item.id)}>
          <Card>
            <ListItemIcon>
              <CalendarTodayIcon />
              <Typography datacy={`${getTimeSlotDatacy(item.id)}-range`}>
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
