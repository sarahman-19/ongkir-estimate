import { FormGroup, Input, Label, Button } from "reactstrap";
import { React, Component } from "react";
import "./FormInput.css";

class FormInput extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        asal: "",
        tujuan: "",
      },
    };
  }

  handleInput = (e) => {
    let newData = { ...this.state.data };
    newData[e.target.name] = e.target.value;

    this.setState({
      data: newData,
    });
  };

  render() {
    return (
      <div className="FormInput">
        <div className="form">
          <FormGroup>
            <div className="input">
              <Label for="asal">Asal</Label>
              <Input id="asal" name="asal" type="select">
                <option value="-0.4510928, 117.1437407" selected>
                  AWS
                </option>
                <option value="-0.4998679, 117.1303437" selected>
                  KMD
                </option>
                <option value="-0.482450, 117.163399" selected>
                  PLT
                </option>
                <option value="-0.5072819, 117.1692535" selected>
                  SBT
                </option>
                <option value="-0.4759319, 117.1651373" selected>
                  RMJ
                </option>
              </Input>
            </div>
            <div className="input">
              <Label for="tujuan">Tujuan</Label>
              <Input
                onInput={this.handleInput}
                id="tujuan"
                name="tujuan"
                placeholder="Masukkan Alamat tujuan"
                type="text"
                autoComplete="off"
              />
            </div>
            <div>
              <Button
                onClick={() =>
                  this.props.handleSubmit(
                    document.getElementById("asal").value,
                    this.state.data.tujuan
                  )
                }
                block
                color="primary"
              >
                Estimate
              </Button>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default FormInput;
