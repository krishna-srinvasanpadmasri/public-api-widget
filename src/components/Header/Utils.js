export function getHeaderText() {
  let headerPath = window.location.pathname;
  let headerText = headerPath.replace(/[-\\/]/g, (match) => {
    if (match === "-") return " ";
    if (match === "/") return "";
    return match; // This line is not really necessary in this case
  });
  if (headerText === "") headerText = "Home";
  return headerText.toUpperCase();
}
