export default (getColor) => ({
  keys: ["MTTA"],
  indexBy: "_id",
  colorBy: "id",
  minValue: 0,
  layers: ["grid", "axes", "bars", "markers", "mesh"],
  colors: getColor,
  enableLabel: true,
  labelTextColor: "white",
  label: (d) => `${d.data.Count}`,
});
