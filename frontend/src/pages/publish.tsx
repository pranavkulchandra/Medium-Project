import { useEffect, useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';
import axios from "axios";
import { BackendUrl } from "../config";


interface TiptapProps {
    setContent: (content: string) => void;
    getContent : () => string;
}


const Tiptap = ({ setContent, getContent }: TiptapProps ) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Bold,
        Italic,
        Blockquote,
        BulletList,
        OrderedList,
        ListItem, // Ensure ListItem is included
        CodeBlock,
      ],
      content: '<p>Enter Content!</p>',
      onUpdate: ({ editor  }) => { 
        setContent(editor.getHTML());
      }
    });

    // useEffect(() => { 
    //     if (editor) { 
    //         setContent(editor.getHTML());
    //     }
    // }, [editor, setContent])
  
  if (!editor) { 
    return null 
  }

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('bold') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('italic') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('orderedList') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Ordered List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('codeBlock') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Code Block
        </button>
      </div>
      <EditorContent editor={editor} className="border border-gray-300 p-5 rounded-lg focus:outline-none" />
    </div>
  );
};









export const Publish = () => {

    const [ title , setTitle ] = useState(''); 
    const [ content , setContent ] = useState('');

    const publishPost = async () => { 
        try {
            const resp = await axios.post(`${BackendUrl}/api/v1/blog/post`, {title, content},{ 
                headers : { 
                    "Authorization" : localStorage.getItem("token")
                }
            })
            console.log(resp.data)
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-lg ">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value)}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter title"
        />
      </div>
      <div className="w-full max-w-screen-lg">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Blog
        </label>  
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
            <Tiptap setContent={setContent} getContent={() => content} />
            <div className="flex justify-center pt-4">
                    <button onClick={publishPost} type="button" className="text-white w-32 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
                </div>
        </div>      
        
      </div>
    </div>
  );
};

export default Publish;
