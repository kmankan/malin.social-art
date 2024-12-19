'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { PresignedUrlRequest, PresignedUrlResponse, UploadResponse } from '@/types/index';
import { ProgressBar } from "@/app/components/ui/ProgressBar"

// Add these constants at the top, after imports
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const MAX_FILE_SIZE_MB = 10; // for display purposes

// this page will allow the user to upload an artwork they like;
export function FileUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { user } = useUser();

  // returns a presigned URL for file uploads
  // can be used to upload from the client side
  const getPresignedUrl = async (file: File): Promise<PresignedUrlResponse> => {
    const payload: PresignedUrlRequest = {
      fileName: file.name,
      fileType: file.type
    };

    const response = await fetch('/api/upload/get-upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.json(); // returns a url and key
  }

  const uploadFile = async (
    presignedUrl: string,
    file: File
  ): Promise<UploadResponse> => {
    try {
      const xhr = new XMLHttpRequest();
      console.log('Starting upload with XMLHttpRequest...');

      const uploadPromise = new Promise<UploadResponse>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Upload progress: ${progress}%`);
            console.log('Bytes loaded:', event.loaded, 'Total bytes:', event.total);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          console.log('Upload complete! Status:', xhr.status);
          resolve({ success: xhr.status >= 200 && xhr.status < 300 });
        });

        xhr.addEventListener('error', () => {
          console.error('XHR upload failed with error:', xhr.status);
          reject(new Error('Upload failed'));
        });
      });

      console.log('Opening XHR connection to:', presignedUrl);
      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      console.log('Sending file:', file.name, 'Size:', file.size, 'bytes');
      xhr.send(file);

      return await uploadPromise;
    } catch (error) {
      console.error('Upload error in catch block:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  // Add type validation helper
  function isValidFile(file: File): { valid: boolean; error?: string } {
    if (!file.type.startsWith('image/')) {
      return { valid: false, error: 'Please select a valid image file' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: `File size must be less than ${MAX_FILE_SIZE_MB}MB` };
    }
    return { valid: true };
  }

  // handles the onChange event of the input element
  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files is an array-like object containing all files selected
    // / ?.[0] safely accessses the first file if any
    const selectedFile = e.target.files?.[0];
    // if a file was selected, validate and process it
    if (selectedFile) {
      const validation = isValidFile(selectedFile);
      if (validation.valid) {
        console.log('File type:', selectedFile.type); // e.g., "image/jpeg", "image/png"
        setFile(selectedFile);
        const reader = new FileReader();
        // onloadend is an event handler that runs when the reading operation is complete
        reader.onloadend = () => {
          // this sets up an event listener for when reading completes
          // reader.result contains the files content as Base64 encoded string
          // like this: data:image/jpeg;base64,/9j/4AAQSkZJRg...
          // sets preview to be image source
          setPreview(reader.result as string);
        };
        // We start to read the file contents
        reader.readAsDataURL(selectedFile);
      } else {
        alert(validation.error);
        e.target.value = ''; // Reset the input
      }
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadProgress(0); // Reset progress at start
    console.log('Starting upload process...');

    if (!file) {
      alert('Could not find file');
      return;
    }

    try {
      // 1. Get the presigned URL
      console.log('Getting presigned URL for:', file.name);
      const { presignedUploadUrl, key } = await getPresignedUrl(file);
      console.log('Got presigned URL:', presignedUploadUrl);
      console.log('File key:', key);

      // 2. Upload directly to S3
      console.log('Uploading to S3...');
      const uploadResponse = await uploadFile(presignedUploadUrl, file);
      console.log('S3 upload response:', uploadResponse);

      if (!uploadResponse.success) throw new Error('Upload to S3 failed');

      // 3. Notify the backend
      console.log('Notifying backend about upload...');
      const notifyBackend = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          S3key: key,
          clerk_id: user?.id
        })
      });

      if (!notifyBackend.ok) {
        console.error('Backend notification failed:', await notifyBackend.text());
        throw new Error('Failed to update backend');
      }

      console.log('Upload process completed successfully!');
      alert('Upload successful!');
      setFile(null);
      setPreview(null);

    } catch (error) {
      console.error('Upload error:', error);
      console.error('Full error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        error
      });
      alert('Upload failed!');
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <main className="flex-grow p-8 flex items-start justify-center">
        <div className="p-6 rounded-lg shadow-md w-full max-w-2xl">
          <form onSubmit={handleUpload} className="space-y-4 flex flex-col">
            <div className='text-center'>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-4">
                Choose artwork to upload
              </label>
              <input
                type="file"
                id="image_upload"
                name="image_uploads"
                accept="image/*"
                onChange={handleChooseFile}
                className="mt-1 text-sm text-gray-500 mb-4
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-2 file:border-red-700
                  file:text-sm file:font-semibold
                  file:bg-rose-50 file:text-rose-700
                  hover:file:bg-rose-100"
              />
            </div>
            {preview && (
              // child image container gets positioned 'relative' to parents
              <div className='mt-4 relative mx-auto w-full max-w-lg aspect-[4/3]'>
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className='object-contain rounded-lg' //contain shows the whole image, maintaining ratio
                  unoptimized
                />
              </div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div>
                <ProgressBar progressValue={uploadProgress} />
              </div>
            )}
            <div className='flex justify-center pt-8'>
              <button
                type="submit"
                className="px-4 py-2 mx-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
              >
                Upload
              </button>
            </div>
            <div className='flex justify-center'>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
