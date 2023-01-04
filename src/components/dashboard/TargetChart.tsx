import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { healthTargetSales } from "redux/sales/monthlyTarget/targetSlice";
import { getTargetAsync } from "redux/sales/monthlyTarget/targetThunk";
import { thisMonthTotalSales } from "redux/sales/dailySales/dailySalesSlice";
import { arc, format, interpolate, pie, PieArcDatum, select } from "d3";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import styles from "styles/dashboard/TargetChart.module.scss";

const TargetChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetData = useAppSelector(healthTargetSales);
  const monthlyTotalSales = useAppSelector(thisMonthTotalSales);
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();
  //현재 달성률
  const presentPercent =
    targetData === "0"
      ? 0
      : Math.floor(
          (monthlyTotalSales / Number(targetData.replace(/,/g, ""))) * 100
        );

  const width = 100;
  const height = 100;
  const innerRadius = width / 2 - 25;
  const outerRadius = width / 2 - 10;

  const handleDrawChart = useCallback(
    (cavasElement: HTMLDivElement) => {
      const percentFormatter = format(".1f");

      const calcPercent = (percent: number): number[] => {
        return [percent, 100 - percent];
      };

      const data = {
        min: calcPercent(0), // [0. 100]
        percentage: calcPercent(presentPercent as number),
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

      //background circle
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
        .attr("dx", "2")
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
            middleText.text(percentFormatter(interpolateText(t)) + "%");
            return arcGenerator(d) as string;
          };
        };
      };

      frontCircle
        .transition()
        .duration(1000)
        .attrTween("d", arcTween(pieGenerator(data.percentage)))
        .attr("class", "active");
    },
    [presentPercent, innerRadius, outerRadius]
  );

  useEffect(() => {
    // 미리 데이터 불러옴
    if (targetData === "0") {
      try {
        dispatch(getTargetAsync({ userUid })).unwrap();
      } catch {
        alert("데이터를 불러오는 데 실패했습니다.");
      }
    } else {
      const canvasElement = containerRef.current;
      if (canvasElement) {
        handleDrawChart(canvasElement);
      }
    }
  }, [targetData, dispatch, userUid, handleDrawChart]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>이번 달 목표 달성률</div>
      <div className={styles.contentContainer}>
        {targetData === "0" ? (
          <div className={styles.noneContent}>
            <div>등록된 목표금액이 없습니다.</div>
            <div className={styles.addBtn}>
              <Plus fill="gray" />
              <Link to="/sales/monthly-target">등록하기</Link>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className={styles.canvasContainer}></div>
        )}
      </div>
    </div>
  );
};

export default TargetChart;
