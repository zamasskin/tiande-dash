import { Card } from "react-bootstrap";

function TwoLines({ top, bottom, ...props }) {
  return (
    <Card className="shadow-sm" {...props}>
      <Card.Body>
        <p className="card-title text-md-left">{top}</p>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-xl-0">{bottom}</h3>
        </div>
      </Card.Body>
    </Card>
  );
}

TwoLines.Placeholder = ({ col = 8, ...props }) => (
  <Card className="shadow-sm" {...props}>
    <Card.Body className="placeholder-glow">
      <p className="card-title text-md-left">
        <span className="placeholder col-5"></span>
      </p>
      <p>
        <span className={"placeholder placeholder-lg col-" + col}></span>
      </p>
    </Card.Body>
  </Card>
);

export default TwoLines;
