import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MaterialTable from 'material-table';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Modal from "@material-ui/core/Modal";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function ModelAdmin(props) {
  const [modelCodes, setModelCodes] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

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
    .catch(() => {
      handleModalOpen();
    })
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <label>
          <TextField
            id="name-field"
            label="Enter Code"
            helperText="Enter a new product code"
            variant="outlined"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <TextField
            id="code-field"
            label="Enter Product"
            helperText="Enter a new product name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          type="submit"
        >
          Save
        </Button>
      </form>
      <div>
        <MaterialTable
          title="Current Values"
          columns={[
            { title: "Product Model Name", field: "name", editable: "never" },
            { title: "Serial Code", field: "code", editable: "never" },
          ]}
          data={modelCodes}
        />
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        Something went wrong with that request!
      </Modal>
    </div>
  );
}

export default ModelAdmin;
