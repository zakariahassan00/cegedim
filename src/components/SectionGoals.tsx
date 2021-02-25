import { useEffect, useState, useMemo } from 'react';
import { Checkbox } from '@material-ui/core';

type Props = {
  goals: string[];
  name: string;
};

const SectionGoals = (props: Props) => {
  const { goals, name } = props;
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
  }, [localForm]);

  const numberOfAchievedGoals = useMemo(() => {
    return Object.keys(localForm).filter((goal) => localForm[goal] === true)
      .length;
  }, [localForm]);

  return (
    <>
      <p>
        {numberOfAchievedGoals}/{goals.length}
      </p>
      <ul>
        {goals.map((instruction, i) => {
          const htmlFor = `${name}-${i}`;
          const currentValue = !!localForm?.[htmlFor];
          return (
            <li key={i}>
              <Checkbox
                id={htmlFor}
                name={htmlFor}
                checked={!!localForm?.[htmlFor]}
                onChange={(e) => {
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
    </>
  );
};

export default SectionGoals;
