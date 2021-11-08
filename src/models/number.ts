export function numberFormat(
  price: number,
  decimals = 2,
  decPoint = ".",
  thousandsSep = " ",
  hideZero = false
) {
  const reqExp = new RegExp("\\B(?=(?:\\d{3})+(?!\\d))", "g");
  let [left, right = ""] = price.toFixed(decimals).toString().split(".");
  if (decimals > 0 && hideZero) {
    right = right.replace(/[0]+$/, "");
  }
  left = left.replace(reqExp, thousandsSep);
  return (right.length > 0 ? left + decPoint + right : left).toString();
}

export function numberFormatRub(
  price: number,
  decimals = 2,
  decPoint = ".",
  thousandsSep = " ",
  hideZero = false
) {
  return (
    numberFormat(price, decimals, decPoint, thousandsSep, hideZero) + " руб"
  );
}

export function numberFormatBall(
  price: number,
  decimals = 2,
  decPoint = ".",
  thousandsSep = " ",
  hideZero = false
) {
  return numberFormat(price, decimals, decPoint, thousandsSep, hideZero) + " Б";
}

export function numberFormatDe(
  price: number,
  decimals = 2,
  decPoint = ".",
  thousandsSep = " ",
  hideZero = false
) {
  return (
    numberFormat(price, decimals, decPoint, thousandsSep, hideZero) + " De"
  );
}
