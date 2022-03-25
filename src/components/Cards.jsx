import React, { useEffect, useState } from "react";
import Logo from '../images/logo.png'

const Cards = () => {

    const [datosPokemon, setdatosPokemon] = useState({
        nombre: "",
        imagen: "",
        attack: "",
        special_attack: "",
        defense: "",
        speed: "",
        type: ""
    });

    const [typeColor, setTypeColor] = useState({
        bug: "#26de81",
        dragon: "#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire: "#f0932b",
        flying: "#81ecec",
        grass: "#00b894",
        ground: "#EFB549",
        ghost: "#a55eea",
        ice: "#74b9ff",
        normal: "#95afc0",
        poison: "#6c5ce7",
        psychic: "#a29bfe",
        rock: "#2d3436",
        water: "#0190FF",
      });

      const [themeColor, setThemeColor] = useState({
          color: ""
      });


    const [loading, setLoading] = useState(true);


    useEffect(() => {
        obtenerDatos();
      }, []) 

      const obtenerDatos = async() => {   
          
        const randomNumber = Math.floor((Math.random() * (150 - 1 + 1)) + 1);
        
        const data = await fetch('https://pokeapi.co/api/v2/pokemon/'+randomNumber)
        const users = await data.json()
        setdatosPokemon({
            nombre: users.forms[0]['name'],
            imagen: users.sprites['front_default'],
            attack: users.stats[1]['base_stat'],
            special_attack: users.stats[3]['base_stat'],
            defense: users.stats[2]['base_stat'],
            speed: users.stats[5]['base_stat'],
            type: users.types
        })

        setThemeColor({
            color: typeColor[users.types[0].type.name]
        })

        setLoading(false);

    }

    const getRandomPokemon = () =>{
        obtenerDatos();
    }

    if (loading) return( 
      <div className="spiner_loading">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )

  return (
    <div>
      <div className="row margin_0">
      <div class="col-md-12">
        <div className="div_logo" ><img src={Logo} className="width_180" />
          </div>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card" style={{backgroundColor: themeColor.color}}>
            <div className="text-center">
                <img className="card-img-top img_pokemon" src={datosPokemon.imagen}  alt={datosPokemon.nombre} />
            </div>
            
            <div className="card-body">

              <div className="row">
                <div className="col-md-12">
                    <h1 className="title_pokemon">{datosPokemon.nombre}</h1>
                        <div className="div_types">
                        {
                            datosPokemon.type.map(j => (
                                <span className="span_types" style={{backgroundColor: typeColor[j.type['name']]}} key={j.slot}>
                                    <span>{j.type['name']}</span>
                                </span>
                            ))
                            
                        }
                        </div>
                </div>
              </div>
              

              <div className="row text-center">
                  <div className="col-md-3">
                      <div>{datosPokemon.attack}</div>
                      <div className="font_size_15">Atack</div>
                  </div>
                  <div className="col-md-3">
                      <div>{datosPokemon.special_attack}</div>
                      <div className="font_size_15">Sp. Attack</div>
                  </div>
                  <div className="col-md-3">
                      <div>{datosPokemon.defense}</div>
                      <div className="font_size_15">Defense</div>
                  </div>
                  <div className="col-md-3">
                      <div>{datosPokemon.speed}</div>
                      <div className="font_size_15">Speed</div>
                  </div>
              </div>
              <button onClick={getRandomPokemon} className="btn btn-dark btn_random">Get Random Pokemon</button>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Cards;
