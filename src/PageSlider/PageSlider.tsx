import ReactSlider from "react-slider";
import "./PageSlider.css";

type Props = {
  page: number;
  updatePage: (pageNumber: number) => void;
};

const PageSlider = ({ page, updatePage }: Props) => {
  return (
    <ReactSlider
      className="test"
      thumbClassName="thumb"
      trackClassName="slider"
      renderThumb={(props, state) => <div {...props}></div>}
      min={1}
      max={4}
      value={page}
      defaultValue={1}
      onChange={(val, index) => updatePage(val)}
    />
  );
};

export default PageSlider;
