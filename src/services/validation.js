//Note:
//  in backend ==> phone is required only . it does not have other validations

// phone , seed , country  is required only . it does not have other validations


export const getRequiredMessage = (fieldName) => `${fieldName} is required` 
export const EMAIL_VALIDATION ={
    
    required: getRequiredMessage("Email"),
    pattern:{
    value:/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    message : "The email format is invalid"
    }
}
export const PASSWORD_VALIDATION={
    
    required:getRequiredMessage("Password"),
    minLength: {
    value: 6,
    message: "password must be at least 6 characters long."
    },
    pattern:{
        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."

    }
}
export const NAME_VALIDATION= {
    required:getRequiredMessage("name"),
    minLength: {
    value: 4,
    message: "User name must be at least 4 characters"
    },
    maxLength: {
        value: 8,
        message: "User name must not exceed 8 characters"
    },
    pattern: {
        value: /^[A-Za-z]+[0-9]+$/,
        message: "User name must start with letters and end with numbers, without spaces"
    }
}
export const PHONE_VALIDATION={
     required:getRequiredMessage("phone"),
    
     pattern:{
        value:/^01[0125][0-9]{8}$/,
        message:"please enter valid phone number "
     }
}
export const REQUIRED_VALIDATION = (fieldName) => ({ required: getRequiredMessage(fieldName) })