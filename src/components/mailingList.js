import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useReducer, useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { mailingListSchema } from "@/lib/validationSchemas/mailingListSchema";
import { APPURL, PRIMARY_COLOR, PRIMARY_WHITE } from "@/lib/globals";
import { PhoneIcon, EmailIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftElement,
    Grid,
    GridItem,
    Select,
    Heading,
    Text,
    Button,
    HStack,
    Spinner,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

const reducer = (state, action) => {
    switch (action.type) {
        case "updateFirstName": {
            return {
              ...state,
              firstName: action.firstName,
            };
        }
        case "updateMiddleName": {
            return {
              ...state,
              middleName: action.middleName,
            };
        }
        case "updateLastName": {
            return {
              ...state,
              lastName: action.lastName,
            };
        }
        case "updateEmail": {
            return {
              ...state,
              email: action.email,
            };
        }
        case "updatePhone": {
            return {
              ...state,
              phone: action.phone,
            };
        }
        case "updateAddress": {
          return {
            ...state,
            address: action.address,
          };
        }
        case "updateZip": {
          return {
            ...state,
            zip: action.zip,
          };
        }
        case "updateAddressState": {
          return {
            ...state,
            addressState: action.addressState,
          };
        }
        case "updateCity": {
          return {
            ...state,
            city: action.city,
          };
        }
        case "incrementNumberOfGuests": {
            return {
              ...state,
              numberOfGuests: state.numberOfGuests >= 7 ? 7 : state.numberOfGuests + 1,
            };
        }
        case "decrementNumberOfGuests": {
            return {
              ...state,
              numberOfGuests: state.numberOfGuests <= 1 ? 1 : state.numberOfGuests - 1,
            };
        }
        case "incrementNumberOfRooms": {
            return {
              ...state,
              numberOfRooms: state.numberOfRooms >= 5 ? 5 : state.numberOfRooms + 1,
            };
        }
        case "decrementNumberOfRooms": {
            return {
              ...state,
              numberOfRooms: state.numberOfRooms <= 1 ? 1 : state.numberOfRooms - 1,
            };
        }
        case "updateSharingWith": {
          return {
            ...state,
            sharingWith: action.sharingWith,
          };
        }
        case "updateDecision": {
            return {
              ...state,
              decision: action.decision,
            };
        }
        case "clearState": {
          return {
              firstName: "",
              middleName: "",
              lastName: "",
              email: "",
              phone: "",
              address: "",
              zip: "",
              addressState: "",
              city: "",
              numberOfGuests: 1,
              numberOfRooms: 1,
              sharingWith: "",
              decision: "",
          };
        }
        default:
          throw Error("Unknown action: " + action.type);
    }
};

const mailingListDetails = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  zip: "",
  addressState: "",
  city: "",
  numberOfGuests: 1,
  numberOfRooms: 1,
  sharingWith: "",
  decision: "",
};

export default function MailingList() {
    const [state, dispatch] = useReducer(reducer, mailingListDetails);
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [submissionResponseStatus, setsubmissionResponseStatus] = useState(false);
    const [submissionResponseMessage, setsubmissionResponseMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(mailingListSchema),
    });

    const attemptUpdateMailingList = async () => {
        setLoading(true);

        const request = await fetch(`${APPURL}/api/mailingListEndpoint`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        });

        const response = await request.json();

        setsubmissionResponseMessage(response.message);
        setsubmissionResponseStatus(response.success);

        if(response.success !== true) 
        {
            setLoading(false);
            onOpen();
            return;
        }

        onOpen();
        dispatch({type: "clearState"});
        setLoading(false);
    }

    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          motionPreset='slideInBottom'>
            <AlertDialogOverlay>
                <AlertDialogContent background={submissionResponseStatus ? "#38a169" : "#e53e3e"} color={"#FAFAFA"}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold' display={"flex"} alignItems={"center"} justifyContent={"left"} gap={"18px"}>
                        {submissionResponseStatus ? <CheckCircleIcon /> : <WarningIcon />}
                        {submissionResponseStatus ? "Success!" : "Error"}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        { submissionResponseMessage }
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose} color={submissionResponseStatus ? "#38a169" : "#e53e3e"}>
                            Close
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Heading as={"h2"} size={"lg"} id="questionnaireHeading">
          Let us know if you are interested in coming to Beaches Negril by filling out and submitting the questionnaire below.
          <Text marginTop={"18px"} fontSize={"lg"}>Only one person per group/family needs to fill out this form. If you want to update any info you have submitted, call one of us!</Text>
        </Heading>
  
        <form onSubmit={handleSubmit(attemptUpdateMailingList)}>
            <Grid gap={"36px"}>
                <GridItem>
                    <FormControl isRequired isInvalid={errors?.firstName?.message} isDisabled={loading}>
                      <FormLabel>First name</FormLabel>
                      <Input type='text' 
                             focusBorderColor={ PRIMARY_COLOR }
                             {...register('firstName')}
                             value={state.firstName}
                             onChange={(e) => dispatch({type: "updateFirstName", firstName: e.target.value,})} />
                      <FormHelperText>Who is filling out the form?</FormHelperText>
                      {errors?.firstName?.message ? <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isDisabled={loading}>
                      <FormLabel>Middle name</FormLabel>
                      <Input type='text' 
                             focusBorderColor={ PRIMARY_COLOR }
                             value={state.middleName}
                             onChange={(e) => dispatch({type: "updateMiddleName", middleName: e.target.value,})} />
                      <FormHelperText>If you know anyone in our family with your name, include your middle initial please.</FormHelperText>
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isRequired isInvalid={errors?.lastName?.message} isDisabled={loading}>
                      <FormLabel>Last name</FormLabel>
                      <Input type='text' 
                             focusBorderColor={ PRIMARY_COLOR }
                             {...register("lastName")} 
                             value={state.lastName}
                             onChange={(e) => dispatch({type: "updateLastName", lastName: e.target.value,})} />
                      <FormHelperText>Which {state.firstName === "" ? "person" : state.firstName } is filling out the form?</FormHelperText>
                      {errors?.lastName?.message ? <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>
        
                <GridItem>
                    <FormControl isRequired isInvalid={errors?.email?.message} isDisabled={loading}>
                      <FormLabel>Email address</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                          <EmailIcon color='gray.400' />
                        </InputLeftElement>
                        <Input type='email' 
                               focusBorderColor={ PRIMARY_COLOR }
                               {...register("email")}
                               value={state.email}
                               onChange={(e) => dispatch({type: "updateEmail", email: e.target.value,})} />
                      </InputGroup>
                      <FormHelperText>Well never share your email, but we may need it later for updates.</FormHelperText>
                      {errors?.email?.message ? <FormErrorMessage>{errors?.email?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>
        
                <GridItem>
                    <FormControl isRequired isInvalid={errors?.phone?.message} isDisabled={loading}>
                      <FormLabel>Phone number</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                          <PhoneIcon color='gray.400' />
                        </InputLeftElement>
                        <Input type='text' 
                               focusBorderColor={ PRIMARY_COLOR }
                               {...register("phone")} 
                               value={state.phone}
                               onChange={(e) => dispatch({type: "updatePhone", phone: e.target.value,})} />
                      </InputGroup>
                      <FormHelperText>A phone number we can reach you at, if we need to talk.</FormHelperText>
                      {errors?.phone?.message ? <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isRequired isInvalid={errors?.address?.message} isDisabled={loading}>
                      <FormLabel>Home Address</FormLabel>
                      <InputGroup>
                        <Input type='text' 
                               focusBorderColor={ PRIMARY_COLOR }
                               {...register("address")} 
                               value={state.address}
                               onChange={(e) => dispatch({type: "updateAddress", address: e.target.value,})} />
                      </InputGroup>
                      <FormHelperText>An address so we can send an invitation.</FormHelperText>
                      {errors?.address?.message ? <FormErrorMessage>{errors?.address?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isRequired isInvalid={errors?.zip?.message} isDisabled={loading}>
                      <FormLabel>Zip Code</FormLabel>
                      <InputGroup>
                        <Input type='text' 
                               focusBorderColor={ PRIMARY_COLOR }
                               {...register("zip")} 
                               value={state.zip}
                               onChange={(e) => dispatch({type: "updateZip", zip: e.target.value,})} />
                      </InputGroup>
                      {errors?.zip?.message ? <FormErrorMessage>{errors?.zip?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isRequired isInvalid={errors?.addressState?.message} isDisabled={loading}>
                      <FormLabel>State</FormLabel>
                      <InputGroup>
                        <Input type='text' 
                               focusBorderColor={ PRIMARY_COLOR }
                               {...register("addressState")} 
                               value={state.addressState}
                               onChange={(e) => dispatch({type: "updateAddressState", addressState: e.target.value,})} />
                      </InputGroup>
                      {errors?.addressState?.message ? <FormErrorMessage>{errors?.addressState?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <FormControl isRequired isInvalid={errors?.city?.message} isDisabled={loading}>
                      <FormLabel>City</FormLabel>
                      <InputGroup>
                        <Input type='text' 
                               focusBorderColor={ PRIMARY_COLOR }
                               {...register("city")} 
                               value={state.city}
                               onChange={(e) => dispatch({type: "updateCity", city: e.target.value,})} />
                      </InputGroup>
                      {errors?.city?.message ? <FormErrorMessage>{errors?.city?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>
        
                <GridItem>
                    <FormControl isRequired isInvalid={errors?.numberOfGuests?.message} isDisabled={loading}>
                        <FormLabel>Number of guests</FormLabel>
                        <HStack>
                            <Button isDisabled={loading} onClick={() => dispatch({type: "decrementNumberOfGuests"})}
                                    color={ PRIMARY_COLOR } borderColor ={ PRIMARY_COLOR } variant={"outline"}>
                                -
                            </Button>
                            <Input required 
                                   focusBorderColor={ PRIMARY_COLOR }
                                   textAlign={"center"}
                                   type="number"
                                   {...register("numberOfGuests")}
                                   value={state.numberOfGuests}
                                   onChange={() => {}} />
                            <Button isDisabled={loading} onClick={() => dispatch({type: "incrementNumberOfGuests"})}
                                    color={ PRIMARY_COLOR } borderColor ={ PRIMARY_COLOR } variant={"outline"}>
                              +
                            </Button>
                        </HStack>
                      <FormHelperText>The estimated amount of people you plan to bring.</FormHelperText>
                      {errors?.numberOfGuests?.message ? <FormErrorMessage>{errors?.numberOfGuests?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>
        
                <GridItem>
                    <FormControl isRequired isInvalid={errors?.numberOfRooms?.message} isDisabled={loading}>
                        <FormLabel>Number of rooms</FormLabel>
                        <HStack>
                            <Button isDisabled={loading} onClick={() => dispatch({type: "decrementNumberOfRooms"})}
                                    color={ PRIMARY_COLOR } borderColor ={ PRIMARY_COLOR } variant={"outline"}>
                              -
                            </Button>
                            <Input required
                                   focusBorderColor={ PRIMARY_COLOR }
                                   textAlign={"center"}
                                   type="number"
                                   {...register("numberOfRooms")}
                                   value={state.numberOfRooms}
                                   onChange={() => {}} />
                            <Button isDisabled={loading} onClick={() => dispatch({type: "incrementNumberOfRooms"})}
                                    color={ PRIMARY_COLOR } borderColor ={ PRIMARY_COLOR } variant={"outline"}>
                              +
                            </Button>
                        </HStack>
                        <FormHelperText>The estimated amount of rooms you expect to reserve and pay for.</FormHelperText>
                      {errors?.numberOfRooms?.message ? <FormErrorMessage>{errors?.numberOfRooms?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>
        
                <GridItem>
                  <FormControl isDisabled={loading}>
                      <FormLabel>Who are you sharing a room with?</FormLabel>
                      <Input type='text' 
                             focusBorderColor={ PRIMARY_COLOR }
                             placeholder='Bob Smith, John Smith, Larry Smith'
                             value={state.sharingWith}
                             onChange={(e) => dispatch({type: "updateSharingWith", sharingWith: e.target.value,})} />
                      <FormHelperText>
                          Tell us who you plan to share a room with. If you are not sharing a room, leave this blank. 
                      </FormHelperText>
                  </FormControl>
                </GridItem>
        
                <GridItem>
                    <FormControl isRequired isInvalid={errors?.decision?.message} isDisabled={loading}>
                        <FormLabel>Are you interested in traveling for our wedding?</FormLabel>
                        <Select placeholder='Select option'
                                focusBorderColor={ PRIMARY_COLOR }
                                {...register("decision")}
                                value={state.decision}
                                onChange={(e) => dispatch({type: "updateDecision", decision: e.target.value,})} >
                          <option value='Yes, I can&apos;t wait!'>Yes, I can&apos;t wait!</option>
                          <option value='I need to think about it.'>I need to think about it.</option>
                          <option value='I don&apos;t think I can make it.'>I don&apos;t think I can make it.</option>
                        </Select>
                        {errors?.decision?.message ? <FormErrorMessage>{errors?.decision?.message}</FormErrorMessage> : null}
                    </FormControl>
                </GridItem>

                <GridItem>
                    <Button isDisabled={loading} type="submit" style={{minWidth: "188px"}} color={ PRIMARY_COLOR } borderColor ={ PRIMARY_COLOR } variant={"outline"}>
                        {
                            loading ?
                            <Spinner /> : "Submit questionnaire"
                        }
                    </Button>
                </GridItem>

                <GridItem>
                  <Text><b>*Please note that this is not our official invitation. We are looking to see who is interested in coming and there is no need to book anything at this time.</b></Text>
                </GridItem>
            </Grid>
        </form>
      </>
    );
}