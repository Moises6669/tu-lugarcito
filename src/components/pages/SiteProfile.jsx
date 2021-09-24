import React, { useState } from "react";
import { NavBar, ContainerCards, Footer } from "../organisms/index";
import { BiAddToQueue } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/core/Autocomplete";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { IoMdSend, IoMdAddCircle } from "react-icons/io";
import { data } from "../../data";
import { BsHouseFill } from "react-icons/bs";

export default function SiteProfile() {
  const [tabs, setTabs] = useState(1);
  const [site, setSite] = useState({
    cover_page: null,
    images: [],
    type_of_rental: "",
    backyar: "",
    offer: "",
    bedrooms: null,
    garage: null,
    bathrooms: null,
    price: null,
    address: "",
    description: "",
  });

  function toggleTabs(i) {
    setTabs(i);
  }

  const options = [
    { label: "Venta", name: "offer" },
    { label: "Alquiler", name: "offer" },
  ];

  const optionsPlayground = [
    { label: "Sí", name: "backyar" },
    { label: "No", name: "backyar" },
  ];

  const optionsGarage = [
    { label: "Sí", name: "garage" },
    { label: "No", name: "garage" },
  ];

  const optionsAlquiler = [
    { label: "Casa", name: "type_of_rental" },
    { label: "Solo habitacion", name: "type_of_rental" },
    { label: "Departamento", name: "type_of_rental" },
  ];

  function handleInput(e) {
    setSite({
      ...site,
      [e.target.name]: e.target.value,
    });
  }

  function toggleImage(e, secondary) {
    if (e.target.files && e.target.files.length > 0) {
      if (secondary) {
        setSite({
          ...site,
          cover_page: e.target.files[0],
        });
      } else {
        setSite({
          ...site,
          images: [...site.images, e.target.files[0]],
        });
      }
    }
  }

  function handleOptions(event, value) {
    setSite({
      ...site,
      [value.name]: value.label,
    });
  }

  return (
    <>
      <NavBar />
      <nav className="tabs">
        <ul className="tabs-list">
          <li
            onClick={() => toggleTabs(1)}
            className={
              tabs === 1
                ? "tabs-list__item tabs-list__item-active"
                : "tabs-list__item"
            }
          >
            <span>Crear Nuevo</span>
            <IoMdAddCircle />
          </li>
          <li
            onClick={() => toggleTabs(2)}
            className={
              tabs === 2
                ? "tabs-list__item tabs-list__item-active"
                : "tabs-list__item"
            }
          >
            <span>Mis Sitios</span>
            <BsHouseFill />
          </li>
        </ul>
      </nav>
      <div className={tabs === 1 ? "siteProfile" : "tabs-hidden"}>
        <div className="new-site">
          <h2 className="new-site__title">Nueva propiedad</h2>
          <div className="new-site__drapAndDrop">
            <input
              type="file"
              onChange={(e) => toggleImage(e, true)}
              className="new-site__file"
              accept="image/gif, image/jpeg, image/png, image/svg"
            />
            <BiAddToQueue />
            <h4>Seleccione su foto para portada</h4>
          </div>
          <div className="new-site__drapAndDrop">
            <input
              type="file"
              onChange={(e) => toggleImage(e)}
              className="new-site__file"
              accept="image/gif, image/jpeg, image/png, image/svg"
            />
            <BiAddToQueue />
            <h4>Agregar fotos</h4>
            <span>O arrastrla y sueltalas</span>
          </div>
          <Autocomplete
            onChange={handleOptions}
            className="new-site__control"
            disablePortal
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Propiedad en venta o alquiler" />
            )}
          />
          <Autocomplete
            onChange={handleOptions}
            className="new-site__control"
            disablePortal
            options={optionsPlayground}
            renderInput={(params) => <TextField {...params} label="Patio" />}
          />
          <Autocomplete
            onChange={handleOptions}
            disablePortal
            className="new-site__control"
            options={optionsAlquiler}
            renderInput={(params) => (
              <TextField {...params} label="Tipo de alquiler" />
            )}
          />
          <div className="new-site__control new-site__textfield">
            <TextField
              fullWidth
              onChange={(e) => handleInput(e)}
              name="bedrooms"
              label="Numero de habitaciones"
            />
          </div>
          <Autocomplete
            onChange={handleOptions}
            className="new-site__control"
            disablePortal
            options={optionsGarage}
            renderInput={(params) => <TextField {...params} label="Garage" />}
          />
          <div className="new-site__control new-site__textfield">
            <TextField
              onChange={(e) => handleInput(e)}
              name="bathrooms"
              fullWidth
              label="Numero de baños"
            />
          </div>
          <div className="new-site__control new-site__textfield">
            <FormControl fullWidth onChange={(e) => handleInput(e)}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Precio por mes
              </InputLabel>
              <OutlinedInput
                name="price"
                startAdornment={
                  <InputAdornment position="start">C$</InputAdornment>
                }
                label="Amount"
              />
            </FormControl>
          </div>
          <div className="new-site__control new-site__textfield">
            <TextField
              onChange={(e) => handleInput(e)}
              name="address"
              multiline
              maxRows={4}
              fullWidth
              label="Dirección de la propiedad"
            />
          </div>
          <div className="new-site__control new-site__textfield">
            <TextField
              onChange={(e) => handleInput(e)}
              name="description"
              multiline
              maxRows={4}
              fullWidth
              label="Descripcion de la propiedad"
            />
          </div>
          <div className="new-site__send">
            <Button
              onClick={() => console.log(site)}
              fullWidth
              color="secondary"
              variant="contained"
              endIcon={<IoMdSend />}
            >
              Publicar
            </Button>
          </div>
        </div>
      </div>
      <ContainerCards
        cls={tabs === 2 ? "main-sites" : "tabs-hidden"}
        type="estate"
        data={data}
      />
      <Footer />
    </>
  );
}