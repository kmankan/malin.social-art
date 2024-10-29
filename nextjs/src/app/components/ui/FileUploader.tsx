'use client'
import { useState } from 'react';
import Image from 'next/image'

// this page will allow the user to upload an artwork they like;
export function FileUploader() {
  const [preview, setPreview] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      <main className="flex-grow p-8 border-2">
        <div className="p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div className='flex flex-col'>
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
              <div className='mt-4 relative max-w-lg aspect-[4/3]'>
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className='object-contain rounded-lg'
                  unoptimized
                />
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 mx-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
            >
              Upload
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
