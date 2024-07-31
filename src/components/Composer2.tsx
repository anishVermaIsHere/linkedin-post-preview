import { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Ellipsis } from 'lucide-react';

const Composer = () => {
  const [postContent, setPostContent] = useState('');
  const reactQuillRef = useRef<any>(null);

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
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
      ['color']
    ],
  };

  const handleCustomFormatting = (type: string) => {
    if (reactQuillRef.current) {
      const quill = reactQuillRef.current.getEditor();
      let selection = quill.getSelection();
      if (selection) {
        let text = quill.getText(selection.index, selection.length);
        let unicodeText = text;

        switch (type) {
          case 'bold':
            unicodeText = [...text].map(char => {
              if (char >= 'A' && char <= 'Z') {
                return String.fromCodePoint(char.codePointAt(0) + 0x1D400 - 0x41);
              } else if (char >= 'a' && char <= 'z') {
                return String.fromCodePoint(char.codePointAt(0) + 0x1D41A - 0x61);
              }
              return char;
            }).join('');
            break;
          case 'italic':
            unicodeText = [...text].map(char => {
              if (char >= 'A' && char <= 'Z') {
                return String.fromCodePoint(char.codePointAt(0) + 0x1D434 - 0x41);
              } else if (char >= 'a' && char <= 'z') {
                return String.fromCodePoint(char.codePointAt(0) + 0x1D44E - 0x61);
              }
              return char;
            }).join('');
            break;
          case 'strike':
            unicodeText = [...text].map(char => char + '\u0336').join('');
            break;
          default:
            break;
        }

        quill.deleteText(selection.index, selection.length);
        quill.insertText(selection.index, unicodeText);
      }
    }
  };

  useEffect(() => {
    if (reactQuillRef.current) {
      const toolbar = reactQuillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('bold', () => handleCustomFormatting('bold'));
      toolbar.addHandler('italic', () => handleCustomFormatting('italic'));
      toolbar.addHandler('strike', () => handleCustomFormatting('strike'));
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 p-2">
      <div className="overflow-auto"> {/* Add overflow and height to handle large content */}
        <ReactQuill 
          ref={reactQuillRef}
          className='bg-white h-full' 
          theme='snow' 
          formats={editorFormats}
          modules={editorModules}
          value={postContent} 
          onChange={setPostContent} 
          placeholder='Type...'
        />
      </div>
      <div className='px-5 py-2'>
        <div className='flex flex-col w-full bg-white shadow-lg rounded-lg py-2 px-2.5'>
          <UserProfile />
          <div className='flex flex-wrap text-gray-700 text-base'>
            <div dangerouslySetInnerHTML={{ __html: postContent }} />
          </div>
          <PostFooter />
        </div>
      </div>
    </div>
  );
}

const UserProfile = () => (
  <div className='flex items-center'>
    <div className='grid place-items-center h-14 w-14 rounded-full overflow-hidden'>
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
);

const PostFooter = () => (
  <div className='flex justify-between items-center mt-4'>
    <div className='relative flex justify-center items-center'>
      <img src={'/src/assets/icons/like.png'} alt="like" />
      <img src={'/src/assets/icons/light.png'} alt="light" className='ms-[-8px]'/>
      <img src={'/src/assets/icons/clapping.png'} alt="clapping" className='ms-[-8px]'/>
      <div className='text-xs text-gray-500 cursor-pointer hover:underline hover:text-blue-600 ms-2'>96 </div>
    </div>
    <div className='flex'>
      <div className='text-xs text-gray-500 cursor-pointer hover:underline hover:text-blue-600 me-2'>10 comments </div>
      <div className='text-xs text-gray-500 cursor-pointer hover:underline hover:text-blue-600'>3 share </div>
    </div>
  </div>
);

export default Composer;
