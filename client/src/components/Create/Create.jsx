import React from "react";
import { useState, useEffect }  from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../actions";
import styles from "./Create.css";
import Nav from "./../Nav/Nav.jsx"


function validate(input) {
    let errors = {};                             //genero un objeto errores
    if (!input.name) {                           //input es mi estado local, si en mi estadolocal.name no hay nada, 
        errors.name = "Name is required";        //entonces en mi objeto.name pongo un string que diga se requiere un nombre
    } else if (!input.min_height) {
        errors.min_height = "Min height is required";
    } else if (input.min_height <= 0) {
        errors.min_height = "Min height should be greater than zero";
    } else if (!input.max_height) {
        errors.max_height = "Max height is required";
    } else if (input.max_height <= 0) {
        errors.max_height = "Max height should be greater than zero";
    } else if (parseInt(input.min_height) >= parseInt(input.max_height)) {      //convierto el peso que me viene en string en un entero para compararlo
        errors.max_height = "Max height must be greater than Min height";
    } else if (!input.min_weight) {
        errors.min_weight = "Min weight is required";
    } else if (input.min_weight <= 0) {
        errors.min_weight = "Min weight should be greater than zero";
      } else if (!input.max_weight) {
        errors.max_weight = "Max weight is required";
      } else if (input.max_weight <= 0) {
        errors.max_weight = "Max weight should be greater than zero";
      } else if (parseInt(input.min_weight) >= parseInt(input.max_weight)) {      //convierto el peso que me viene en string en un entero para compararlo
        errors.max_weight = "Max weight must be greater than Min weight";
      }  else if (!input.life_span) {
        errors.life_span = "Life span is required";
    } else if (input.life_span <= 0) {
        errors.life_span  = "Life span should be grater than zero";
    } else if (input.life_span > 20) {
        errors.life_span  = "Life span should be smaller than 20";
    } else if (!input.image) {
        errors.image = "Please insert an image URL";
    } else if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)) {
        errors.image = "Please insert a valid image URL";
    }
    return errors;
};

export default function CreateDog () {
  
    const dispatch = useDispatch()
    const history = useHistory()                           // mètodo del router que me redirige a la ruta que yo le diga 
    const temperaments = useSelector((state) => state.temperaments)
    const [temps, setTemps] = useState([])              
    const [errors, setErrors] = useState({});          //genero un estado local errors y setErrors que va ser un objeto vacío  

    const [input, setInput] = useState({               //acá me guardo en un estado local los datos del formulario y le paso lo que necesita el post
        name: "",        
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: []           //temperament va a ser un arreglo porque quiero poner mas de uno (un string no me serviría)
    })

    useEffect (() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e){                //todos los inputs del formulario van a necesitar tener la prop handleChange
        e.preventDefault()                  
        setInput({                          //quiero ir guardando las cosas que el usuario escriba en el input en mi estado input
            ...input,                       //traé todo lo que ya tenías 
            [e.target.name] : e.target.value   //y seteame el e.target.name en e.target.value (agregame el e.target.value de lo que esté
        })                                   //modificando, el target.name se lo fui pasando en el formulario, si esta modificando el
        //name, va a tomar el target.value de name, si esta modificando life span, va a tomar el target.value de name='life_span'
       //a medida que va modificando me va llenando ese estado
       setErrors(validate({                 //seteame mi estado errores, pasándole la función validate de más arriba,
           ...input,                        //con el estado input y el e.target.name en el e.target.value
           [e.target.name] : e.target.value
       }));
       console.log(input)
    };

    function handleSelect(e) {
           
            if(!temps.includes(e.target.value)){
                if(temps.length > 0){
                  
                    setTemps([...temps, e.target.value])     //traeme lo que había y agregále mi e.target.value
                } else {                                     //y eso va a guardar en un arreglo todo lo que guarde en el select, todo lo que vaya seleccionando
                    setTemps([e.target.value])               //cada vez que hago click en cada select me lo va agregando ahí
                }
            } console.log(e.target.value)
    
    }
    function handleDelete(e){           //uso el handleDelete para borrar del estado un temp que la persona pueda quitar un temperamento que había elegido antes
        e.preventDefault()                                    
        setTemps(temps.filter(temp => temp !== e.target.value))  //Me devuelve el estado nuevo sin ese elemento que yo clikee
        console.log(temps)                                    //en temps tengo todos los temperamentos que fui agregando de la lsita
        console.log(e.target.value)                           //cuando hago click en X consologuea el que filtré 
    } 

    function handleSubmit(e) {                   //el handleSubmit lo voy a usar para submitear el formulario
        if (errors.name !== undefined || 
            errors.min_height !== undefined ||
            errors.max_height !== undefined ||
            errors.min_weight !== undefined ||
            errors.max_weight !== undefined ||
            errors.life_span !== undefined 
            )  {
            document.getElementById("DoNotSubmit"); //con docudntSubmit")
            return alert("Please complete the fields with valid data");
          }
        const addDog= {
            name: input.name,
            height: input.min_height + " - " + input.max_height,
            weight: input.min_weight + " - " + input.max_weight,
            life_span: input.life_span,
            img: input.image,
            temperament: temps
        };
        e.preventDefault()                     //e.preventDefault() me permite prevenir el comportamiento por default de un submit (el comportamiento predeterminado) que en este caso es el envío del formulario
        dispatch(postDog(addDog))               //si no salió por ninguna de las validaciones incorrectas, entonces envío el formulario
        alert("Your dog was successfully created!")
        setInput({                                    //seteo el input en cero otra vez
        name: "",        
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: []  
    })
        setTemps([])                             //seteo el array de temps seleccionados por el usuario para que quede vacio de nuevo
        history.push("/home")                    //cuando termine de hacer esto mandáme al home (porque ya creé mi dog)
    }
    console.log(temperaments)
    
    return(
        <div className={styles.bkg}> 
        <Nav/>
        <div className={styles.container}>
            <h1 className={styles.title}>Create Your Dog!</h1>
            <form  className={styles.form}
          id="DoNotSubmit"
          onSubmit={(e) => handleSubmit(e)}>
            <div><label>Name: </label>
                            <input 
                                key = "name"
                                className={styles.input}
                                placeholder="Enter a Name"
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={(e) => handleChange(e)}
                                />
                                {errors.name && (    //si está mi estado errors.name renderizam un párrafo con ese error
                                    <p className={styles.error}>{errors.name}</p>
                                )}                                       
                        </div>
                        <div className={styles.minMax} >
                        <label>Height: </label>
                                <input className={styles.input} onChange={(e) => handleChange(e)} name="min_height" type="min_height" value={input.min_height} placeholder="Min height"
                                />
                                {errors.min_height && (
                                    <p className={styles.error}>{errors.min_height}</p>
                                )} 
                                <input className={styles.input} onChange={(e) => handleChange(e)} name="max_height" type="max_height" value={input.max_height} placeholder="Max height"
                                />  
                                {errors.max_height && (
                                    <p className={styles.error}>{errors.max_height}</p>
                                )} 
                        </div>
                        <div className={styles.minMax}>
                        <label>Weight: </label>
                                <input className={styles.input} onChange={(e) => handleChange(e)} name="min_weight" type="min_weight" value={input.min_weight} placeholder="Min weight"
                                />
                                {errors.min_weight && (
                                    <p className={styles.error}>{errors.min_weight}</p>
                                )} 
                                <input className={styles.input} onChange={(e) => handleChange(e)} name="max_weight" type="max_weight" value={input.max_weight} placeholder="Max weight"
                                />
                                {errors.max_weight && (
                                    <p className={styles.error}>{errors.max_weight}</p>
                                )}
                        </div>
                        <div > <label>Life Span: </label>
                            <input 
                                className={styles.input}
                                placeholder="Life Span"
                                type="text"
                                name="life_span"
                                value={input.life_span}
                                onChange={(e) => handleChange(e)}
                            />
                                {errors.life_span && (
                                    <p className={styles.error}>{errors.life_span}</p>
                                )} 
                        </div>
                        <div><label>Image: </label>
                            <input 
                                key = "image"
                                className={styles.input}
                                placeholder="Insert URL image"
                                type="text"
                                name="image"
                                value={input.image}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.image && <p className={styles.error}>{errors.image}</p>}
                        </div>
                        <div className={styles.temps}> <label>Choose Temperaments: </label>
                        <select className={styles.templist} name="temperament" onChange={(e) => handleSelect(e)}  type="text" >
                                    <option value={null}></option>
                                    {temperaments.map((temp, id)=>{    //agarro el estado que me traje con el useSelector
                                       /* console.log(temperaments)  //acá hice una prueba */ 
                                    return (
                                        <option key={id} value={temp.id}>{temp.name}</option> //obtengo el temperamento y lo renderizo
                                        )
                                    })}
                                </select>
                                { temps.map((temp, id) =>{  //uso React.Fragment xque tiene la prop key y pasarle el id de cada temp para renderizarlo y que la persona pueda verlo y quitarlo de la lista 
                                    return ( 
                                        <React.Fragment key={id}>   
                                            
                                            <div className={styles.tempSelect}>{temp}
                                            <button className={styles.btnTemp} value={temp} onClick={(e) => handleDelete(e)}>x</button>
                                            </div>
                            
                                        </React.Fragment>
                                        )
                                    })    
                                } 
                                 </div>
                                 <div className={styles.formFooter}>
                                 <button 
                            className={styles.submitbutton} 
                            type= "submit" 
                           name= "submit" 
                             >Create Dog
                            </button>
                            </div>          
            </form>
            </div>
            <div className={styles.back}>
                           <Link to="/home"><button className={styles.backbutton} >Back </button></Link>
                            </div>   
    </div>
 )
}