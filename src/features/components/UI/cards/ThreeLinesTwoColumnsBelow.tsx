import { Card } from 'react-bootstrap'
function ThreeLinesTwoColumnsBelow({top, center, bottomLeft, bottomRight}) {
  return <Card className="shadow-sm">
      <Card.Body>
        <p>{top}</p>
        <div className="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
          <h3 className="mb-0 mb-md-2 mb-xl-0 order-xl-0">{center}</h3>
        </div>
        <p className="mb-0 mt-2 text-success">
          {bottomLeft}
          <span className="text-black ml-1" style={{color: 'black'}}>
            <small> {bottomRight}</small>
          </span>
        </p>
      </Card.Body>
  </Card>
}


ThreeLinesTwoColumnsBelow.Placeholder = function() {
  return <Card className='shadow-sm'>
    <Card.Body className='placeholder-glow'>
      <p>
        <span className="placeholder col-5"></span>
      </p>
      <p>
          <span className="placeholder placeholder-lg col-8"></span>
      </p>
      <p className="card-text placeholder-glow">
        <span className="placeholder col-2"></span>
        <span> </span>
        <span className="placeholder col-4"></span>
      </p>
    </Card.Body>
  </Card>
}

export default ThreeLinesTwoColumnsBelow