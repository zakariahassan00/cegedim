import { Link } from '@material-ui/core';
import EditorLink from 'components/EditorLink';
import TimeSlots from 'components/TimeSlots';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeSlots, timeslotsSelectors } from 'store/timeslots';

const TimeSlotPage = () => {
  const dispatch = useDispatch();
  const timeslots = useSelector((state) =>
    timeslotsSelectors.selectAll(state.timeslots),
  );

  useEffect(() => {
    dispatch(getTimeSlots());
  }, []);

  return (
    <div>
      <section datacy="intro">
        <header>
          <h1>Welcome to the timeslot page</h1>
          <h2>A basic example of how Next.js and Redux work together</h2>
        </header>
        <article>
          <h3>File structure</h3>
          <section>
            <h4>Redux store</h4>
            <p>
              You can find everything related to the Redux store in the
              "src/store" directory.
            </p>
            <p>
              The store itself is exported from{' '}
              <EditorLink path="src/store/index.ts">
                "src/store/index.ts"
              </EditorLink>
              .
            </p>
            <p>
              We used{' '}
              <Link href="https://redux-toolkit.js.org/" target="_blank">
                @reduxjs/toolkit
              </Link>{' '}
              to spare some boilerplate code in the example timeslot slice (see{' '}
              <EditorLink path="src/store/timeslots.ts">
                "src/store/timeslots.ts"
              </EditorLink>{' '}
              for implementation). The library generates extensible reducers,
              actions, and selectors. Asynchronous side effects are handled by
              the{' '}
              <Link
                href="https://github.com/reduxjs/redux-thunk"
                target="_blank"
              >
                redux thunk middleware
              </Link>
              .
            </p>
            <p>
              In order to add a new reducer to your root reducer, add it to{' '}
              <EditorLink path="src/store/reducers.ts:4:32">
                "src/store/reducers.ts"
              </EditorLink>
              .
            </p>
          </section>
        </article>
      </section>
      <section datacy="timeslots">
        <TimeSlots items={timeslots} />
      </section>
    </div>
  );
};

TimeSlotPage.pageTitle = 'Time slots';
TimeSlotPage.pageSubtitle = 'A simple example';

export default TimeSlotPage;
