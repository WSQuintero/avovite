export const handleCall = async (callback) => {
  if (!callback) {
    return { status: false, data: null };
  }
  try {
    return { status: true, data: await callback() };
  } catch (error) {
    return { status: false, data: error };
  }
};

export const validateJSON = (o) => {
  return Object.keys(o).reduce((a, c) => (o[c] === null || o[c] === undefined || o[c] === "" ? [...a, c] : a), []);
};
