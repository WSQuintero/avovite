import * as XLSX from "xlsx";
import { NumericFormat } from "react-number-format";

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

export const validateJSON = (o, e = []) =>
  Object.keys(o).reduce(
    (a, c) => (e.includes(c) ? a : o[c] === null || o[c] === undefined || o[c] === "" || o[c] === "-" ? [...a, c] : a),
    []
  );

export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isYoutubeVideo = (url) => String(url).startsWith("https://www.youtube.com/embed/");

export const formatDate = (date) =>
  `${new Date(date).getDate()} ${
    [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ][new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}`;

export const formatCurrency = (value, prefix = "", sufix = "") => (
  <>
    {prefix}
    <NumericFormat displayType="text" value={value.toFixed(0)} thousandSeparator></NumericFormat>
    {sufix}
  </>
);

export const toFormData = (data) =>
  Object.keys(data).reduce((form, key) => {
    form.append(key, data[key]);
    return form;
  }, new FormData());

export const exportWorksheet = (jsonObject, fileName) => {
  var myFile = fileName;
  var myWorkSheet = XLSX.utils.json_to_sheet(jsonObject);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
  XLSX.writeFile(myWorkBook, myFile);
};
