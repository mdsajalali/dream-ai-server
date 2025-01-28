const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadBase64toImage(base64Data) {
  try {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}`;
    const buffer = Buffer.from(base64Data, "base64");

    const { data, error } = await supabase.storage
      .from("dreamapi")
      .upload(`public/${fileName}.png`, buffer, {
        contentType: "image/jpeg",
      });

    if (error) {
      throw error;
    }

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
    return imageUrl;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = {
  uploadBase64toImage,
};
