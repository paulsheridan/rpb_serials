import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MaterialTable from 'material-table';

function ModelAdmin(props) {
  const [modelCodes, setModelCodes] = useState([]);
  const [name, setName] = useState("name");
  const [code, setCode] = useState("code");

  useEffect(() => {
    let data = {
      query: `
        {
          productCodes (table: "product_model") {
            name
            code
          }
        }
      `
    }
    axios({
      method: "post",
      url: "http://localhost:5000/graphql",
      data: data,
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` }
    })
    .then((response) => {
      setModelCodes(response.data.data.productCodes)
    })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      query: `
        mutation {
          createProductCode(table: "product_model", code: ${JSON.stringify(String(code).toUpperCase())}, name: ${JSON.stringify(String(name))}) {
            productCode {
              code
              name
            }
          }
        }
      `
    }
    axios({
      method: "post",
      url: "http://localhost:5000/graphql",
      data: data,
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` }
    })
    .then((response) => {
      setModelCodes(modelCodes => modelCodes.concat(
        response.data.data.createProductCode.productCode
        ))
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a new model name and code.
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
      <MaterialTable
          title="Current Values"
          columns={[
            { title: 'Product Model Name', field: 'name' , editable: 'never' },
            { title: 'Serial Code', field: 'code' , editable: 'never' },
          ]}
          data={modelCodes}
        />
      </div>
    </div>
  )
}

export default ModelAdmin;
