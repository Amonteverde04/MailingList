import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftElement,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Grid,
    GridItem,
    Stack,
    Radio, 
    RadioGroup,
    Heading,
    Text
} from '@chakra-ui/react';
  
  export default function MailingList() {
    return (
      <>
        <Heading as={"h6"} size={"md"}>
          Let us know if you are coming by filling out and submitting the form below.
          <Text marginTop={"9px"} fontSize={"sm"}>Only one person per group/family needs to fill out this form. If you want to update any info you have submitted, call one of us!</Text>
        </Heading>
  
        <Grid gap={"36px"}>
  
          <GridItem>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input type='text' />
              <FormHelperText>Who is filling out the form?</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Middle name</FormLabel>
              <Input type='text' />
              <FormHelperText>If you know anyone in our family with your name, include your middle initial please.</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Last name</FormLabel>
              <Input type='text' />
              <FormHelperText>Which *name* is filling out the form?</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <EmailIcon color='gray.400' />
                </InputLeftElement>
                <Input type='email' />
              </InputGroup>
              <FormHelperText>Well never share your email, but we may need it later for updates.</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Phone number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <PhoneIcon color='gray.400' />
                </InputLeftElement>
                <Input type='text' />
              </InputGroup>
              <FormHelperText>A phone number we can reach you at, if we need to talk.</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Number of guests</FormLabel>
              <NumberInput isRequired min={1} max={7} clampValueOnBlur>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>The estimated amount of people you plan to bring.</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Number of rooms</FormLabel>
              <NumberInput isRequired min={0} max={5} clampValueOnBlur>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormHelperText>The estimated amount of rooms you expect to reserve and pay for.</FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Who are you sharing a room with?</FormLabel>
              <Input type='text' placeholder='Bob Smith, John Smith, Larry Smith' />
              <FormHelperText>
                Tell us who you plan to share a room with. If you are not sharing a room, leave this blank. 
              </FormHelperText>
            </FormControl>
          </GridItem>
  
          <GridItem>
            <FormControl>
              <FormLabel>Do you plan on traveling with us?</FormLabel>
              <RadioGroup>
                <Stack direction='column' gap={"18px"}>
                  <Radio value='1'>Definitely coming.</Radio>
                  <Radio value='2'>Need to think about it.</Radio>
                  <Radio value='3'>Probably not.</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </GridItem>
  
        </Grid>
      </>
    );
  }