module.exports = function MockECharts(props) {
  return {
    type: "div",
    props: {
      "data-testid": "echarts-mock",
      style: { width: "100%", height: "100%" },
      ...props,
    },
  };
};
