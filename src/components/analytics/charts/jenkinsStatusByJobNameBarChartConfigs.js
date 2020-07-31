export default {
  keys: ["Successful", "Failed"],
  margin: {
    top: 50,
    right: 110,
    bottom: 80,
    left: 120,
  },
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "#38bcb2",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "#eed312",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ],
  fill: [
    {
      match: {
        id: "donut",
      },
      id: "dots",
    },
    {
      match: {
        id: "sandwich",
      },
      id: "lines",
    },
  ],
  axisBottom: {
    format: (e) => Math.floor(e) === e && e,
    tickSize: 8,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Number of Builds",
    legendPosition: "middle",
    legendOffset: 50,
  },
  axisLeft: {
    format: (d) => (typeof d === "string" ? d.substring(0, 6) : ""),
    tickSize: 8,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Build Tag",
    legendPosition: "middle",
    legendOffset: -100,
  },
  legends: [
    {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 110,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 20,
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
          },
        },
      ],
    },
  ],
};
