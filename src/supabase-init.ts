
import { supabase } from "@/integrations/supabase/client";

export const initializeSupabase = async () => {
  try {
    // Check if the logos bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const logosBucketExists = buckets?.some(bucket => bucket.name === 'logos');
    
    if (!logosBucketExists) {
      const { error } = await supabase.storage.createBucket('logos', {
        public: true,
        fileSizeLimit: 2097152, // 2MB limit
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml']
      });
      
      if (error) {
        console.error('Error creating logos bucket:', error);
      } else {
        console.log('Logos bucket created successfully');
      }
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};
