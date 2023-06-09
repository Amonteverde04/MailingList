import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const mailingListSchema = yup.object().shape({
  firstName: yup.string().required("Your first name is required."),
  lastName: yup.string().required("Your last name is required."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("An email is required."),
  phone: yup.string().required("Your phone number is required.").matches(phoneRegExp, 'Phone number is not valid'),
  numberOfGuests: yup.number().min(1).required("The number of guests is required."),
  numberOfRooms: yup.number().min(1).required("The number of rooms is required."),
  decision: yup.string().required("A selection is required."),
});