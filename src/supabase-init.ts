
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
      // Try to create the logos bucket
      const { error } = await supabase.storage.createBucket('logos', {
        public: true,
        fileSizeLimit: 2097152, // 2MB limit
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml']
      });
      
      if (error) {
        console.error('Error creating logos bucket:', error);
        // Even if we can't create the bucket, we should continue as the bucket
        // might already exist or be created by another process
      } else {
        console.log('Logos bucket created successfully');
        
        // Set public access for the bucket
        const { error: policyError } = await supabase.storage
          .from('logos')
          .createSignedUrl('dummy-path.txt', 1);
          
        if (policyError && policyError.message !== 'The resource was not found') {
          console.error('Error setting bucket policy:', policyError);
        }
      }
    }
  } catch (error) {
    console.error('Error initializing Supabase:', error);
  }
};
