import { useEffect, useState, useMemo } from 'react';
import {
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneAllIcon from '@material-ui/icons/DoneAll';

type Props = {
  goals: string[];
  name: string;
  title: string;
  onChange?: () => void;
  onChangeIsAchievedAllGoals?: (value: boolean) => void;
};

const SectionGoals = (props: Props) => {
  const { goals, name, title, onChange, onChangeIsAchievedAllGoals } = props;
  const [localForm, setLocalForm] = useState({});

  useEffect(() => {
    const existingLocalForm = localStorage.getItem(name);
    if (existingLocalForm) {
      setLocalForm(JSON.parse(existingLocalForm));
    } else {
      localStorage.setItem(name, JSON.stringify({}));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(localForm));
    onChange?.();
  }, [localForm]);

  const numberOfAchievedGoals = useMemo(() => {
    return Object.keys(localForm).filter((goal) => localForm[goal] === true)
      .length;
  }, [localForm]);

  const isAchievedAllGoals = useMemo(
    () => numberOfAchievedGoals === goals.length,
    [numberOfAchievedGoals, goals],
  );

  useEffect(() => {
    onChangeIsAchievedAllGoals?.(isAchievedAllGoals);
  }, [isAchievedAllGoals]);

  return (
    <Accordion datacy={name}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3>
          {title}{' '}
          <span>
            {numberOfAchievedGoals}/{goals.length}
          </span>{' '}
          {isAchievedAllGoals && <DoneAllIcon />}
        </h3>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {goals.map((instruction, i) => {
            const htmlFor = `${name}-${i}`;
            const currentValue = !!localForm?.[htmlFor];
            return (
              <li key={i}>
                <Checkbox
                  id={htmlFor}
                  name={htmlFor}
                  checked={currentValue}
                  onChange={() => {
                    setLocalForm((prevState) => ({
                      ...prevState,
                      [htmlFor]: !currentValue,
                    }));
                  }}
                  color="primary"
                />
                <label htmlFor={htmlFor}>{instruction}</label>
              </li>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default SectionGoals;
