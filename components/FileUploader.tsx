"use client"

import { convertFileToUrl } from '@/lib/utils'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined
    onChange: (files: File[]) => void
}

const FileUploader = ({files, onChange}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles : File[]) => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 && (
        <img src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt='uploaded image'
            className='max-h-[400px] overflow-hidden object-cover'
        />
      )}
            <>
                <img src='/assets/icons/upload.svg' 
                    alt='upload icon'
                    width={100}
                    height={100}
                />
                <div className='file-upload_label'>
                    <p className='text-14-regular'>
                        <span className='text-green-500'>
                            Click to upload
                        </span> or drag and drop
                    </p>
                    <p>
                      SVG, PNG, JPG, GIF (Max 800x400)
                    </p>

                </div>
            </>
      
    </div>
  )
}

export default FileUploader