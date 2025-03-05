
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
      console.log('Logo bucket does not exist. Attempting to create it...');
      
      try {
        // Try to create the bucket
        const { error: createError } = await supabase.storage.createBucket('Logo', {
          public: true,
          fileSizeLimit: 5242880, // 5MB limit
        });
        
        if (createError) {
          console.error('Error creating Logo bucket:', createError);
          console.log('The Logo bucket could not be created automatically. Please create it manually in the Supabase dashboard.');
        } else {
          console.log('Logo bucket created successfully.');
        }
      } catch (createError) {
        console.error('Error creating Logo bucket:', createError);
      }
    } else {
      console.log('Logo bucket exists.');
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};
