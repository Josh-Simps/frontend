import ReactSlider from "react-slider";
import "./PageSlider.css";

type Props = {
  page: number;
  maxPages: number;
  updatePage: (pageNumber: number, flipBar: boolean) => void;
};

const PageSlider = ({ page, maxPages, updatePage }: Props) => {
  return (
    <ReactSlider
      className="test"
      thumbClassName="thumb"
      trackClassName="slider"
      renderThumb={(props, state) => <div {...props}></div>}
      min={0}
      max={maxPages}
      value={page}
      defaultValue={1}
      onChange={(val, index) => updatePage(val, true)}
    />
  );
};

export default PageSlider;
