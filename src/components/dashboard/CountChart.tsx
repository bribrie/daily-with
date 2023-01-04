import { useCallback, useEffect, useRef } from "react";
import { arc, format, interpolate, pie, PieArcDatum, select } from "d3";
import styles from "styles/dashboard/RegistrationCount.module.scss";

interface ChartProps {
  dataPercentage: number;
  width: number;
  height: number;
  type: string;
}

const CountChart = ({ dataPercentage, width, height, type }: ChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRadius = width / 2;
  const outerRadius = width / 2 - 5;

  const handleDrawChart = useCallback(
    (cavasElement: HTMLDivElement) => {
      const percentFormatter = format(".1f");

      const calcPercent = (percent: number): number[] => {
        return [percent, 100 - percent];
      };

      const data = {
        min: calcPercent(0), // [0. 100]
        percentage: calcPercent(dataPercentage),
      };

      const canvas = select(cavasElement)
        .call((g) => g.select("svg").remove())
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pieGenerator = pie<number>()
        .sort(null)
        .value((d) => d);

      const arcGenerator = arc<PieArcDatum<number>>()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      //backgroundCircle
      canvas
        .selectAll("path")
        .data(pieGenerator([100]))
        .enter()
        .append("path")
        .attr("fill", "#f2f2f2")
        .attr("d", arcGenerator);

      const frontCircle = canvas
        .selectAll("path")
        .data(pieGenerator([0, 0]))
        .enter()
        .append("path")
        .attr("d", arcGenerator);

      const middleText = canvas
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dx", "1")
        .attr("dy", "3")
        .attr("fill", "gray");

      const arcTween = (pie: PieArcDatum<number>[]) => {
        return function (d: any) {
          const interpolateData = interpolate(
            pie[0].startAngle,
            pie[0].endAngle
          );
          const interpolateText = interpolate(0, pie[0].value);
          return function (t: number) {
            d.endAngle = interpolateData(t);

            if (type === "Today" || type === "Total") {
              middleText.text(`${type}`);
            } else {
              middleText.text(percentFormatter(interpolateText(t)) + "%");
            }
            return arcGenerator(d) as string;
          };
        };
      };

      frontCircle
        .transition()
        .attrTween("d", arcTween(pieGenerator(data.percentage)))
        .attr("class", `${type}`);
    },
    [dataPercentage, innerRadius, outerRadius, height, width, type]
  );

  useEffect(() => {
    const canvasElement = containerRef.current;
    if (canvasElement) {
      handleDrawChart(canvasElement);
    }
  }, [handleDrawChart]);

  return <div ref={containerRef} className={styles.arcChart}></div>;
};

export default CountChart;
