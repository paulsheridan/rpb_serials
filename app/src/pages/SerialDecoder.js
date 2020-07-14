import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MaterialTable from 'material-table';
import { Button } from '../themes/authForms';
import { useAuth } from '../context/auth';

function SerialDecoder(props) {
  const [textValue, setTextValue]  = useState("");
  const [products, setproducts] = useState([])
  const { setAuthTokens } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formatted = textValue.replace(/\n/g, ",").replace(/\s/g, "").split(",");
    let data = {
      query: `
        query {
          productsFromSerials(serials: ${JSON.stringify(formatted)}){
            serial
            model
            modelYear
            monthBuilt
            yearBuilt
            factory
            version
            uniqueId
          }
        }
      `
    }
    await axios({
      method: "post",
      url: "http://localhost:5000/graphql",
      data: data,
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` }
    })
    .then((response) => {
      setproducts(response.data.data.productsFromSerials)
    })
  }

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Serial Numbers:
        </div>
        <textarea value={textValue} onChange={(event) => setTextValue(event.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <MaterialTable
        title="Products"
        columns={[
          { title: 'Serial Number', field: 'serial' , editable: 'never' },
          { title: 'Model', field: 'model' , editable: 'never' },
          { title: 'Model Year', field: 'modelYear' , editable: 'never' },
          { title: 'Month Manufactured', field: 'monthBuilt' , editable: 'never' },
          { title: 'Year Manufactured', field: 'yearBuilt' , editable: 'never' },
          { title: 'Factory', field: 'factory' , editable: 'never' },
          { title: 'Version', field: 'version' , editable: 'never' },
          { title: 'Unique ID', field: 'uniqueId' , editable: 'never' },
        ]}
        data={products}
      />
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default SerialDecoder
