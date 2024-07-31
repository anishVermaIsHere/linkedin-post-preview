import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Ellipsis } from 'lucide-react';
import AppBar from './AppBar';
import '../style.css';


const LinkedinPostPreviewGenerator = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('desktop');
  const reactQuillRef=useRef<any>(null); 
  const editorFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color'
  ];
  const editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
      ['color']
    ],
    // toolbar_emoji: true,
    // "emoji-toolbar": true,
    // "emoji-textarea": true,
    // "emoji-shortname": true,
  }

  console.log('device', selectedDevice)
  
  return (
    <>
    <AppBar 
    selectedDevice={selectedDevice}
    setSelectedDevice={setSelectedDevice}
    />
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 p-2">
      <div className=''>
        <ReactQuill 
          ref={reactQuillRef}
          className='bg-white'
          theme='snow' 
          formats={editorFormats}
          modules={editorModules}
          value={postContent} 
          onChange={setPostContent} 
          placeholder='Type...'
        />
      </div>
      <div className='px-5 py-2'>
        <div className={`flex flex-col w-full bg-white shadow-lg rounded-lg py-2 px-2.5 preview-${selectedDevice.toLowerCase()}`}>
          <div className='pb-2'>
              <div className='flex items-center'>
                <div className='h-14 w-14 rounded-full overflow-hidden'>
                  <img 
                  className='min-w-full h-full'
                  src="https://designimages.appypie.com/profilepicture/profilepicture-10-portrait-photography.jpg" 
                  alt="profile pic" 
                  />
                </div>
                <div className='flex justify-between w-full ms-2 truncate'>
                  <div className='truncate pe-8'>
                    <p className='text-sm font-medium'>David Paul</p>
                    <p className='text-xs text-gray-500 truncate'> 
                      Co-Founder @Breakcold 
                    </p>
                    <p className='text-xs text-gray-500'>3d</p>
                  </div>
                    <div className='text-gray-500'>
                    <Ellipsis />
                    </div>
                </div>
              </div>              
          </div>
          <div className='text-gray-700 text-base'>
            <div dangerouslySetInnerHTML={{ __html: postContent }} />
          </div>

          <div className='flex justify-between items-center mt-4'>
            <div className='relative flex justify-center items-center'>
              <img src={'/src/assets/icons/like.png'} alt="like" className='' />
              <img src={'/src/assets/icons/light.png'} alt="light" className='ms-[-8px]'/>
              <img src={'/src/assets/icons/clapping.png'} alt="clapping" className='ms-[-8px]'/>
              <div className='text-xs text-gray-500 cursor-pointer hover:underline hover:text-blue-600 ms-2'>96 </div>
            </div>
            <div className='flex'>
              <div className='text-xs text-gray-500 cursor-pointer hover:underline hover:text-blue-600 me-2'>10 comments </div>
              <div className='text-xs text-gray-500 cursor-pointer hover:underline hover:text-blue-600'>3 share </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LinkedinPostPreviewGenerator