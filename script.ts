import { table } from "npm:table@6.8.1";



const url = "https://carburanti.mise.gov.it/ospzApi/search/zone";
const santaGiustinaLocation = {
  points: [{ lat: 45.568933438343635, lng: 11.950407660090194 }],
  radius: 10,
};

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(santaGiustinaLocation),
});

const payload = await res.json();
const headers = ["Brand", "Indirizzo", "Benzina", "Diesel", "Data"];
const rows: string[][] = [headers];

for (const item of payload.results) {
  rows.push([
    item?.brand,
    item?.address,
    item.fuels.find((el) => el.name === "Benzina" && el.isSelf === true)
        ?.price
      ? item.fuels.find((el) => el.name === "Benzina" && el.isSelf === true)
        ?.price
      : item.fuels.find((el) => el.name === "Benzina" && el.isSelf === false)
          ?.price
      ? item.fuels.find((el) => el.name === "Benzina" && el.isSelf === false)
        ?.price
      : "/",

    item.fuels.find((el) => el.name === "Gasolio" && el.isSelf === true)
        ?.price
      ? item.fuels.find((el) => el.name === "Gasolio" && el.isSelf === true)
        ?.price
      : item.fuels.find((el) => el.name === "Gasolio" && el.isSelf === false)
          ?.price
      ? item.fuels.find((el) => el.name === "Gasolio" && el.isSelf === false)
        ?.price
      : "/",
    item.insertDate
      ? new Date(item.insertDate).toLocaleString("it-IT", { hour12: false })
      : "/",
  ]);
}
rows.sort((a, b) => {
  return a[2] - b[2];
});
const output = table(rows);
console.log(output);
export {};
