particlesJS.load("particles-js", "/assets/particlesjs-config.json", function() {
  console.log("[particles.js] Loaded particlesjs-config.json");
});


(async () => {
  const paddingInner = 0.1;

  const data = await d3.json("/assets/months.json");

  const [min_year, max_year] = d3.extent(data, d => d.year);
  const years = d3.range(min_year, max_year + 1, 1);
  const num_years = max_year - min_year + 1;

  const [min_month, max_month] = d3.extent(data, d => d.month);
  const months = d3.range(min_month, max_month + 1, 1);

  let width = document.getElementById("waffle").clientWidth;
  let height = 12 * width / num_years;

  const svg = d3.select("#waffle")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const xBand = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .paddingInner(paddingInner);
  const yBand = d3.scaleBand()
    .domain(months)
    .range([0, height])
    .paddingInner(paddingInner);

  width = xBand.bandwidth();
  height = width;

  svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("fill", d => d.fill)
      .attr("height",  height)
      .attr("width", width)
      .attr("x", d => xBand(d.year))
      .attr("y", d => yBand(d.month));
})();
