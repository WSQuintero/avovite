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
  return Object.keys(o).reduce(
    (a, c) => (o[c] === null || o[c] === undefined || o[c] === "" || o[c] === "-" ? [...a, c] : a),
    []
  );
};

export const isToday = (date) => {
  const today = new Date();
  console.log(today);
  console.log(date);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const formatDate = (date) =>
  `${new Date(date).getDate()} ${
    [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ][new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}`;
