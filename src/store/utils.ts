export const parseIds = (data) => {
  const idKeys = Object.keys(data).filter((key) => key.endsWith('Id'));
  idKeys.forEach((key) => {
    data[key] = parseInt(data[key]);
  });
  return data;
};

export const mapIdsToNames = (users) => {
  const map = {};
  users.forEach(
    (user) => (map[user.id] = `${user.firstName} ${user.lastName}`),
  );

  return map;
};
