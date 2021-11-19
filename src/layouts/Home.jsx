import { React, Component } from "react";
import FormInput from "../components/FormInput/FormInput";
import Header from "../components/Header/Header";
import TableResult from "../components/TableResult/TableResult";
import "./Home.css";
import axios from "axios";

// styling

class Home extends Component {
  constructor() {
    super();
    this.state = {
        cabang: '',
        alamatTujuan: '',
        dataTujuan: '',
        jarak: '',
        waktu: []
    };
  }

  changeToNumber = async (alamat) => {
    await axios.get(
      "https://google-maps-geocoding.p.rapidapi.com/geocode/json",
      {
        params: { address: `${alamat}`, language: "id" },
        headers: {
          "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
          "x-rapidapi-key":
            "669ef1c38emsh0fb7bb4784b53fcp1b335djsn1a83fc917ed1",
        },
      }
    )
    .then(data => {
        this.setState({
            dataTujuan : data.data.results[0].geometry.location,
            alamatTujuan: [data.data.results[0].address_components[0].long_name, data.data.results[0].address_components[1].long_name]
        })
    })
  };

  hitungEstimasJarak = async (asal, tujuan) => {
    await this.changeToNumber(tujuan)

    await axios.get(
        "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix",
        {
          params: { origins: `${asal}`, destinations: `${this.state.dataTujuan.lat}, ${this.state.dataTujuan.lng}` },
          headers: {
            "x-rapidapi-host": "trueway-matrix.p.rapidapi.com",
            "x-rapidapi-key":
              "669ef1c38emsh0fb7bb4784b53fcp1b335djsn1a83fc917ed1",
          },
        }
      )
      .then(res => {
          this.setState({
             jarak : res.data.distances,
             waktu : res.data.durations
          })
      })

      let a;
      let b;
      if(Number(this.state.waktu.toString()) < 3600){
        a = Number(this.state.waktu.toString()) / 3600 * 60 
        b = 'menit';
      }else{
        a = Number(this.state.waktu.toString()) / 3600 
        b = 'jam';
      }
      this.setState({
        waktu: [a, b]
      })

      let toko;
      if(asal === '-0.4759319, 117.1651373'){
        toko = "toko remaja"
      }else if(asal === '-0.4510928, 117.1437407'){
        toko = "toko aw syahranie"
      }else if(asal === '-0.4998679, 117.1303437'){
        toko = "toko Teluk Lerong"
      }else if(asal === '-0.482450, 117.163399'){
        toko = "toko Pelita"
      }else if(asal === '-0.5072819, 117.1692535'){
        toko = "toko Sambutan"
      }
      
      this.setState({
        cabang: toko
      })
      console.log(this.state)
  }

  render() {
    return (
      <div className="Home">
        <Header />
        <FormInput handleSubmit={this.hitungEstimasJarak} />
        <TableResult dari={this.state.cabang} tujuan={this.state.alamatTujuan.toString()} jarak={Math.ceil(Number(this.state.jarak.toString()) / 1000)}/>
      </div>
    );
  }
}

export default Home;
