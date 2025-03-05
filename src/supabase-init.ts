
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Check if the Logo bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('Error listing buckets:', bucketError);
      return;
    }

    const logoBucketExists = buckets?.some(bucket => bucket.name === 'Logo');
    
    if (!logoBucketExists) {
      console.log('Logo bucket does not exist. It should be created manually in the Supabase dashboard.');
    } else {
      console.log('Logo bucket exists.');
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};
