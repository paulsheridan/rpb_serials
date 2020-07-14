import React from 'react';
import axios from 'axios';

import MaterialTable from 'material-table';

class SerialNumberInput extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: 'Input Serial Numbers here:',
      products: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const textfieldSerials = this.formatSerials(this.state.value)
    await axios.post("http://localhost:5000/graphql", {
      query: `
        query {
          productsFromSerials(serials: ${JSON.stringify(textfieldSerials)}){
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
    })
    .then((response) => {
      this.setState({
        products: response.data.data.productsFromSerials
      })
    })
  }

  formatSerials(unformatted) {
    return unformatted.replace(/\n/g, ",").replace(/\s/g, "").split(",");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            Serial Numbers:
          </div>
          <textarea value={this.state.value} onChange={this.handleChange} />
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
          data={this.state.products}
        />
      </div>
    );
  }
}

export default SerialNumberInput
