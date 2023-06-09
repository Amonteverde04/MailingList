// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/mongodb";
import { mailingListSchema } from "@/lib/validationSchemas/mailingListSchema";

const handleValidateMailingData = async (userMailingInfo) => {
  try 
  {
    // If valid, returns obj. 
    await mailingListSchema.validate({
      firstName: userMailingInfo.firstName,
      lastName: userMailingInfo.lastName,
      email: userMailingInfo.email,
      phone: userMailingInfo.phone,
      address: userMailingInfo.address,
      numberOfGuests: userMailingInfo.numberOfGuests,
      numberOfRooms: userMailingInfo.numberOfRooms,
      decision: userMailingInfo.decision,
    });
    
    return true;
  } 
  catch (e) 
  {
    // If invalid, breaks and goes to catch.
    return false;
  }
}

const handleExistingMailingData = async (userMailingInfo) => {
  try 
  {
      const client = await clientPromise;
      const db = client.db("mailing_list");
      const query = {
          email: userMailingInfo.email
      };

      const mailingListItem = await db
      .collection("mailing_list_users")
      .findOne(query);

      if(mailingListItem) {
          return true;
      }
      
      return false;
  } 
  catch (e) 
  {
      console.error(e);
  }
}

const handlePatch = async (patchBody) => {
  const userMailingInfo = {
    firstName: patchBody.firstName,
    middleName: patchBody.middleName,
    lastName: patchBody.lastName,
    email: patchBody.email,
    phone: patchBody.phone,
    address: patchBody.address,
    numberOfGuests: patchBody.numberOfGuests,
    numberOfRooms: patchBody.numberOfRooms,
    sharingWith: patchBody.sharingWith,
    decision: patchBody.decision,
  };

  if(await handleValidateMailingData(userMailingInfo) === true)
    {
        try {
          if(await handleExistingMailingData(userMailingInfo)) return {success: false, message: `${userMailingInfo.email} is already in use.`};

          const client = await clientPromise;
          const db = client.db("mailing_list");

          const mailingList = await db
          .collection("mailing_list_users")
          .insertOne(userMailingInfo);

          if(mailingList.insertedId) return {success: true, message: "We've got your questionnaire and we appreciate you taking the time to fill it out. We look forward to seeing your response!"};
            
          return {success: false, message: "Could not reach db provider."};
        }
        catch(e)
        {
          console.error(e);
        }
    }
    else
    {
      return {success: false, message: "Invalid data."};
    }
}

export default async function handler(req, res) 
{
  switch(req.method)
  {
    case "PATCH":
      const patchBody = req.body;
      const patchResponse = await handlePatch(patchBody);
      patchResponse.success === true ? 
        res.json({success: patchResponse.success, message: patchResponse.message}) : res.json({success: patchResponse.success, message: patchResponse.message});
      break;
    default:
      return res.status(400);
  }
}