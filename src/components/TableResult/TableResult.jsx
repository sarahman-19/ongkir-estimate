import {Table} from 'reactstrap';
import './TableResult.css';

const TableResult = (props) => {
  return (
    <div className="TableResult">
      <div className="result">
      <Table bordered responsive>
        <tr>
          <th>Dari :</th>
          <td>{props.dari}</td>
        </tr>
        <tr>
          <th>Ke :</th>
          <td>{props.tujuan}</td>
        </tr>
        <tr>
          <th>Jarak :</th>
          <td>{props.jarak} KM</td>
        </tr>
        {/* <tr>
          <th>waktu :</th>
          <td>{props.waktu}</td>
        </tr> */}
        <tr>
          <th>Ongkos :</th>
          <td>Free</td>
        </tr>
      </Table>
      </div>
    </div>
  );
};

export default TableResult;
