import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
  {
    id: "sync-user",
    triggers: [{ event: "clerk/user.created" }],
  },
  //connect mongo and inngest with db.js and save to mongodb
  async ({ event }) => {
    await connectDB();

    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
    } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    
    // //connect stream and inngest using stream.js and save to stream
    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });

    return { success: true };
  }
);

const deleteUserFromDB = inngest.createFunction(
  {
    id: "delete-user-from-db",
    triggers: [{ event: "clerk/user.deleted" }],
  },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());

    return { success: true };

  }
);

export const functions = [syncUser, deleteUserFromDB];