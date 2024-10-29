'use client'
import { useState } from 'react';
import Image from 'next/image';

// this page will allow the user to upload an artwork they like;
export function FileUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  async function getPresignedUrl(filename: string) {
    const response = await fetch('/api/getPresignedUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename })
    });
    return response.json();
  }

  // handles the onChange event of the input element
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files is an array-like object containing all files selected
    // / ?.[0] safely accessses the first file if any
    const file: File | undefined = e.target.files?.[0];
    // if a file was selected, create a FileReader object, a built in browser API for reading file contents
    if (file) {
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
      reader.readAsDataURL(file);
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();  // Prevent form submission
    // 1. Get the presigned URL
    const { presignedUrl } = await getPresignedUrl(file.name);

    if (!file) {
      alert('No file found');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file)
      // the browser chunks the file
      // the file is encoded into multipart/form-data format and sent as http request stream
      // the server recieves this as a stream

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json()
      console.log('Upload successful:', data)
    } catch (error) {
      console.error('Upload error:', error);
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
                accept="image/*, .pdf"
                onChange={handleFileChange}
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
            <div className='flex justify-center'>
              <button
                type="submit"
                className="px-4 py-2 mx-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
