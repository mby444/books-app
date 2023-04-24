import { http2https } from "../utils/string-formatter";

export const getBookId = (data = {}) => {
  const bookId = data?.id;
  return bookId;
};

export const getThumbnailUrl = (data = {}) => {
  const value = data?.volumeInfo?.imageLinks?.thumbnail;
  const url = http2https(value);
  return url;
};

export const getTitle = (data = {}) => {
  const value = data?.volumeInfo?.title;
  const maxLength = 50;
  const additionalValue = value.length > maxLength ? "..." : "";
  const limitedValue = value.substr(0, maxLength) + additionalValue;
  return limitedValue;
};

export const getAuthor = (data = {}) => {
  const values = data?.volumeInfo?.authors;
  const duoAuthors = values.join(" and ");
  const multiAuthors = values.join(", ");
  const author =
    values?.length > 1
      ? values?.length > 2
        ? multiAuthors
        : duoAuthors
      : values[0];
  return author;
};

export const getPublishedDate = (data = {}) => {
  const value = data?.volumeInfo?.publishedDate;
  const dateYear = value ? value.split("-")[0] : "(unknown year)";
  return dateYear;
};

export const formatPriceText = (priceText = "") => {
  priceText = String(priceText);
  const splitted = priceText.split("");
  const formatted = splitted
    .map((v, i) => {
      const reverseIndex = splitted.length - 1 - i;
      const commaShouldPlaced = reverseIndex % 3 === 0 && reverseIndex !== 0;
      const output = commaShouldPlaced ? `${v},` : v;
      return output;
    })
    .join("");
  return formatted;
};

export const getPriceText = (data = {}) => {
  const { saleInfo } = data;
  const sale = saleInfo?.saleability;
  const retailPrice = saleInfo?.retailPrice?.amount;
  const formattedPrice = formatPriceText(retailPrice);
  const currencyCode = saleInfo?.retailPrice?.currencyCode;
  const countryPrice = `${currencyCode} ${formattedPrice}`;
  const isForSale = parseInt(retailPrice) > 0 && sale === "FOR_SALE";
  const isFree = parseInt(retailPrice) === 0 || sale === "FREE";
  const priceText = isForSale ? countryPrice : isFree ? "FREE" : "UNAVAILABLE";
  return priceText;
};

export default {
  getBookId,
  getThumbnailUrl,
  getTitle,
  getAuthor,
  getPublishedDate,
  formatPriceText,
  getPriceText,
};
