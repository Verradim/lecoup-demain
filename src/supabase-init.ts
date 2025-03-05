
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Check if the logos bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('Error listing buckets:', bucketError);
      return;
    }

    const logosBucketExists = buckets?.some(bucket => bucket.name === 'logos');
    
    if (!logosBucketExists) {
      console.log('Logos bucket does not exist. It should be created manually in the Supabase dashboard.');
    } else {
      console.log('Logos bucket exists.');
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};
