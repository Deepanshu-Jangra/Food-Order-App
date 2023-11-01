import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isSixChar = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const {
    value: enteredName,
    setIsTouched: setNameIsTouched,
    isValid: nameIsValid,
    isInvalid: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredStreet,
    setIsTouched: setStreetIsTouched,
    isValid: streetIsValid,
    isInvalid: streetIsInvalid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isNotEmpty);
  const {
    value: enteredPostalCode,
    setIsTouched: setPostalCodeIsTouched,
    isValid: postalCodeIsValid,
    isInvalid: postalCodeIsInvalid,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInput(isSixChar);
  const {
    value: enteredCity,
    setIsTouched: setCityIsTouched,
    isValid: cityIsValid,
    isInvalid: cityIsInvalid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    setNameIsTouched(true);
    setStreetIsTouched(true);
    setPostalCodeIsTouched(true);
    setCityIsTouched(true);

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);

    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const nameControlClasses = `${classes.control} ${
    nameIsInvalid ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    streetIsInvalid ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postalCodeIsInvalid ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    cityIsInvalid ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameIsInvalid && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetIsInvalid && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeIsInvalid && (
          <p>Please enter a valid postal code (6 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityIsInvalid && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;

//

//

// import { useRef, useState } from "react";
// import classes from "./Checkout.module.css";

// const isEmpty = (value) => value.trim() === "";
// const isFiveChars = (value) => value.trim().length === 6;

// const Checkout = (props) => {
//   const [formInputsValidity, setFormInputsValidity] = useState({
//     name: true,
//     street: true,
//     city: true,
//     postalCode: true,
//   });
//   const nameInputRef = useRef();
//   const streetInputRef = useRef();
//   const postalCodeInputRef = useRef();
//   const cityInputRef = useRef();

//   const confirmHandler = (event) => {
//     event.preventDefault();

//     const enteredName = nameInputRef.current.value;
//     const enteredStreet = streetInputRef.current.value;
//     const enteredPostalCode = postalCodeInputRef.current.value;
//     const enteredCity = cityInputRef.current.value;

//     const enteredNameIsValid = !isEmpty(enteredName);
//     const enteredStreetIsValid = !isEmpty(enteredStreet);
//     const enteredCityIsValid = !isEmpty(enteredCity);
//     const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

//     const formIsValid =
//       enteredNameIsValid &&
//       enteredStreetIsValid &&
//       enteredCityIsValid &&
//       enteredPostalCodeIsValid;

//     setFormInputsValidity({
//       name: enteredNameIsValid,
//       street: enteredStreetIsValid,
//       city: enteredCityIsValid,
//       postalCode: enteredPostalCodeIsValid,
//     });

//     if (!formIsValid) {
//       return;
//     }

//     props.onConfirm({
//       name: enteredName,
//       street: enteredStreet,
//       city: enteredCity,
//       postalCode: enteredPostalCode,
//     });
//   };

//   const nameControlClasses = `${classes.control} ${
//     formInputsValidity.name ? "" : classes.invalid
//   }`;
//   const streetControlClasses = `${classes.control} ${
//     formInputsValidity.street ? "" : classes.invalid
//   }`;
//   const cityControlClasses = `${classes.control} ${
//     formInputsValidity.city ? "" : classes.invalid
//   }`;
//   const postalCodeControlClasses = `${classes.control} ${
//     formInputsValidity.postalCode ? "" : classes.invalid
//   }`;

//   return (
//     <form className={classes.form} onSubmit={confirmHandler}>
//       <div className={nameControlClasses}>
//         <label htmlFor="name">Your name</label>
//         <input type="text" id="name" ref={nameInputRef} />
//         {!formInputsValidity.name && <p>Please enter a valid name!</p>}
//       </div>

//       <div className={streetControlClasses}>
//         <label htmlFor="street">Street</label>
//         <input type="text" id="street" ref={streetInputRef} />
//         {!formInputsValidity.street && <p>Please enter a valid street!</p>}
//       </div>

//       <div className={cityControlClasses}>
//         <label htmlFor="city">City</label>
//         <input type="text" id="city" ref={cityInputRef} />
//         {!formInputsValidity.city && <p>Please enter a valid city!</p>}
//       </div>

//       <div className={postalCodeControlClasses}>
//         <label htmlFor="postal">Postal code</label>
//         <input type="text" id="postal" ref={postalCodeInputRef} />
//         {!formInputsValidity.postalCode && (
//           <p>Please enter a valid postal code (6 characters long)!</p>
//         )}
//       </div>

//       <div className={classes.actions}>
//         <button type="button" onClick={props.onCancel}>
//           Cancel
//         </button>
//         <button className={classes.submit}>Confirm</button>
//       </div>
//     </form>
//   );
// };

// export default Checkout;
