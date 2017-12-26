
const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const Guid = () => {
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};

const Guid8 = () => {
  return s4() + s4();
};

const Guid16 = () => {
  return s4() + s4() + s4() + s4();
};

export default {
  Guid,
  Guid16,
  Guid8
};
