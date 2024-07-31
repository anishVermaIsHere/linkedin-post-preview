
import { useState, useEffect, type ChangeEvent } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';


const LinkedInPostPreview = () => {
  const [editorContent, setEditorContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState('Laptop');

  useEffect(() => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      }
    });

    quill.on('text-change', () => {
      setEditorContent(quill.root.innerHTML);
    });
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">LinkedIn Post Composer</h2>
        <div id="editor" className="bg-white p-4 border border-gray-300 rounded"></div>
        <input type="file" onChange={handleImageUpload} className="mt-2" />
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setSelectedDevice('Laptop')} className="py-2 px-4 bg-blue-500 text-white rounded">Laptop</button>
        <button onClick={() => setSelectedDevice('Mobile')} className="py-2 px-4 bg-blue-500 text-white rounded">Mobile</button>
        <button onClick={() => setSelectedDevice('Tablet')} className="py-2 px-4 bg-blue-500 text-white rounded">Tablet</button>
      </div>
      
      <div className={`preview-${selectedDevice.toLowerCase()}`}>
        <div className="border p-4 bg-white">
          <div dangerouslySetInnerHTML={{ __html: editorContent }} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4" />}
        </div>
      </div>
      
      <style jsx>{`
        .preview-laptop { width: 100%; }
        .preview-mobile { width: 360px; }
        .preview-tablet { width: 768px; }
      `}</style>
    </div>
  );
};

export default LinkedInPostPreview;
