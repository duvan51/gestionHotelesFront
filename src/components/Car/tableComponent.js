
import Table from "react-bootstrap/Table";


const TableComponent = ({ data, deleteId, onButtonClick }) => {

  

  if (!data) {
    return (
      <div>
        Error: CartContext is undefined. Make sure your component is wrapped
        with CartProvider.
      </div>
    );
  }
  const a = (data.map(x => Number(x.price)))
  //console.log(">>>>" , a)

  var xTotal = 0
  var suma = a.forEach(element => {
    //console.log(element)
    xTotal += element
  });

 console.log(suma)



  return (
    <>
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre habitacion</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (x) => (
            //  console.log(x),
              
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.price}</td>
                  <td>
                    <div>
                      <div>
                        <button onClick={()=> deleteId(x.id) }>✖️</button>
                      </div>
                      <div></div>
                    </div>
                  </td>
                </tr>
             
            )
          )}

          <tr>
            <td colSpan={2}>Total</td>
            <td colSpan={2}>{xTotal}</td>
          </tr>
        </tbody>
      </Table>
      
    </>
  );
};

export default TableComponent;
