import {
  axisBottom,
  axisLeft,
  max,
  scaleBand,
  scaleLinear,
  select,
  Selection,
} from "d3";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { currentUserUid } from "redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  salesLoading,
  thisMonthHealthSales,
} from "redux/sales/dailySales/dailySalesSlice";
import { getOneMonthSalesAsync } from "redux/sales/dailySales/dailySalesThunk";
import { SalesListType } from "redux/sales/salesTypes";
import { ReactComponent as Plus } from "assets/images/Plus.svg";
import styles from "styles/dashboard/SalesChart.module.scss";

const SalesChart = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const thisMonthList = useAppSelector(thisMonthHealthSales);
  const userUid = useAppSelector(currentUserUid);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(salesLoading);

  const width = 650;
  const height = 250;
  const margin = { top: 30, left: 70, bottom: 25, right: 20 };

  const drawChart = useCallback(
    (canvas: Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      const xvalueFormat = (d: string) => d.slice(-2);
      const yValueToNumber = (d: string) => Number(d.replace(/,/g, ""));

      const maxData = max(thisMonthList, (d: SalesListType) =>
        yValueToNumber(d.totalSales)
      );
      const date = thisMonthList
        .map((el) => el.date.slice(-2))
        .sort((a: any, b: any) => a - b);

      // Axes 그리기
      const xScale = scaleBand()
        .domain(date)
        .range([margin.left, width - margin.right])
        .paddingInner(0.3)
        .paddingOuter(0.2);

      const yScale = scaleLinear()
        .domain([0, maxData] as number[])
        .range([height - margin.bottom, margin.top]);

      const xAxis = axisBottom(xScale).tickSizeOuter(0);
      const yAxis = axisLeft(yScale);

      canvas
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0,${height - margin.bottom})`);

      canvas
        .append("g")
        .call(yAxis)
        .attr("transform", `translate(${margin.left},0)`)
        .call((g) => g.select(".domain").remove()); //세로 선 없애기

      //bar그리기
      canvas
        .append("g")
        .selectAll("bar")
        .data(thisMonthList)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => Number(xScale(xvalueFormat(d.date))))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(0))
        .attr("height", 0) //0 => totalSales 높이로 transition 효과 주기 위해
        .transition()
        .duration(1000)
        .attr("y", (d) => yScale(yValueToNumber(d.totalSales)))
        .attr(
          "height",
          (d) => height - margin.bottom - yScale(yValueToNumber(d.totalSales))
        ) // data의 orders 값 적용
        .attr("fill", "black");

      //bar위에 totalSales값 보여주기
      canvas
        .append("g")
        .selectAll("text")
        .data(thisMonthList)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("class", "salesText")
        .attr("y", (d) => yScale(yValueToNumber(d.totalSales)) - 5)
        .text((d) => d.totalSales)
        .attr(
          "x",
          (d) => Number(xScale(xvalueFormat(d.date))) + xScale.bandwidth() / 2
        )
        .attr("fill-opacity", 0)
        .transition()
        .delay(1000)
        .duration(750)
        .attr("fill-opacity", 1);
    },
    [thisMonthList, margin.top, margin.bottom, margin.right, margin.left]
  );

  useEffect(() => {
    if (thisMonthList.length === 0 && loading === "idle") {
      dispatch(getOneMonthSalesAsync({ userUid })).unwrap();
      return;
    }
    const canvas = select(containerRef.current)
      .call((g) => g.selectAll("g").remove())
      .attr("viewBox", `0 0 ${width} ${height}`);
    if (canvas) {
      drawChart(canvas);
    }
  }, [thisMonthList.length, dispatch, userUid, drawChart, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>이번 달 일별 매출</div>
      <div className={styles.contentContainer}>
        {thisMonthList.length === 0 ? (
          <div className={styles.noneContent}>
            <div>등록된 이번달 매출이 없습니다.</div>
            <div className={styles.addBtn}>
              <Plus fill="gray" />
              <Link to="/sales/today">등록하기</Link>
            </div>
          </div>
        ) : (
          <svg ref={containerRef} className={styles.canvasContainer}></svg>
        )}
      </div>
    </div>
  );
};

export default SalesChart;
